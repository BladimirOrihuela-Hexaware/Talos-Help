CREATE OR REPLACE PROCEDURE acquire_lock(IN in_license_id license.id%TYPE, IN in_client_id VARCHAR, OUT out_msg VARCHAR)
LANGUAGE plpgsql
AS $$
DECLARE n_locks license.max_clients%TYPE; -- number of locks currently acquired for this license
DECLARE max_n_locks license.max_clients%TYPE; -- maximum number of concurrent locks for this license
DECLARE is_active BOOLEAN DEFAULT false;
DECLARE exp_date license.expiration%TYPE;
DECLARE n_deleted INT; -- number of deleted clients after purge
BEGIN
    SELECT active, expiration INTO is_active, exp_date FROM license WHERE id = in_license_id;

    IF is_active IS false THEN -- check license is still active
        out_msg = 'E_EXPIRED';
    ELSE
        IF exp_date < CURRENT_DATE THEN -- check license has not expired
            out_msg = 'E_EXPIRED';
        ELSE
            LOCK TABLE license_usage IN EXCLUSIVE MODE; -- only allow concurrent reads when the lock is acquired

            IF NOT EXISTS (SELECT license_id FROM license_usage WHERE license_id = in_license_id AND client_id = in_client_id) THEN -- verify lock has not been acquired
                SELECT COUNT(license_id) INTO n_locks FROM license_usage WHERE license_id = in_license_id;
                SELECT max_clients INTO max_n_locks FROM license WHERE id = in_license_id;

                RAISE DEBUG 'n_locks = %, max_n_locks = % for license id = %', n_locks, max_n_locks, in_license_id;

                IF n_locks < max_n_locks THEN -- verify there are locks available
                    INSERT INTO license_usage(license_id, client_id, last_ka_received_at) VALUES (in_license_id, in_client_id, clock_timestamp());
                    out_msg = 'SUCCESS';
                ELSE
                    -- there are no locks available
                    -- run garbage collection to delete all dead clients
                    CALL purge_dead_clients(in_license_id, n_deleted);
                    
                    RAISE DEBUG 'Garbage collection removed % dead clients', n_deleted;

                    IF n_deleted > 0 THEN -- if 1 or more clients were deleted => 1 or more locks are available
                        INSERT INTO license_usage(license_id, client_id, last_ka_received_at) VALUES (in_license_id, in_client_id, clock_timestamp());
                        out_msg = 'SUCCESS';
                    ELSE -- no clients were deleted, so no locks were released
                        out_msg = 'E_LIMIT_REACHED';
                    END IF;
                END IF;
            ELSE
                -- lock was already acquired
                out_msg = 'E_ALREADY_ACQUIRED';
            END IF;

            COMMIT;
        END IF;
    END IF;
END
$$;

CREATE OR REPLACE PROCEDURE release_lock(IN in_license_id license.id%TYPE, IN in_client_id VARCHAR, OUT out_msg VARCHAR)
LANGUAGE plpgsql
AS $$
BEGIN
    LOCK TABLE license_usage IN EXCLUSIVE MODE; -- only allow concurrent reads when the lock is acquired

    DELETE FROM license_usage WHERE license_id = in_license_id::uuid AND client_id = in_client_id;
    COMMIT;

    IF NOT FOUND THEN
        -- lock was not previously acquired
        out_msg = 'E_NOT_ACQUIRED';
    ELSE
        out_msg = 'SUCCESS';
    END IF;
END
$$;

CREATE OR REPLACE PROCEDURE purge_dead_clients(IN in_license_id license.id%TYPE, OUT n_deleted INT)
LANGUAGE plpgsql
AS $$
DECLARE alive_after license_usage.last_ka_received_at%TYPE;
BEGIN
    alive_after := clock_timestamp() - (SELECT (client_timeout || ' minutes')::interval FROM license WHERE id = in_license_id);
    
    WITH deleted AS (
        DELETE FROM license_usage 
            WHERE license_id = in_license_id 
                AND last_ka_received_at < alive_after
            RETURNING license_id
    )
    SELECT COUNT(*) INTO n_deleted FROM deleted;
END
$$;