CREATE OR REPLACE PROCEDURE acquire_lock(IN in_license_id VARCHAR, IN in_client_id VARCHAR, OUT out_msg VARCHAR)
LANGUAGE plpgsql
AS $$
DECLARE license_uuid uuid;
DECLARE n_locks INT; -- number of locks currently acquired for this license
DECLARE max_n_locks INT; -- maximum number of concurrent locks for this license
BEGIN
    SELECT CAST(in_license_id AS uuid) INTO license_uuid;

    LOCK TABLE license_usage IN EXCLUSIVE MODE; -- only allow concurrent reads when the lock is acquired

    IF NOT EXISTS (SELECT license_id FROM license_usage WHERE license_id = license_uuid AND client_id = in_client_id) THEN -- verify lock has not been acquired
        SELECT COUNT(license_id) INTO n_locks FROM license_usage WHERE license_id = license_uuid;
        SELECT max_clients INTO max_n_locks FROM license WHERE license_id = license_uuid;

        IF n_locks < max_n_locks THEN -- verify there are locks available
            INSERT INTO license_usage(license_id, client_id, last_ka_received_at) VALUES (license_uuid, in_client_id, clock_timestamp());
            out_msg = 'SUCCESS';
        ELSE
            out_msg = 'E_LIMIT_REACHED';
        END IF;
    ELSE
        -- lock was already acquired
        out_msg = 'E_ALREADY_ACQUIRED';
    END IF;

    COMMIT;
END
$$;

CREATE OR REPLACE PROCEDURE release_lock(IN in_license_id VARCHAR, IN in_client_id VARCHAR, OUT out_msg VARCHAR)
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