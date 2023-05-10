CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE org(
    id      uuid DEFAULT uuid_generate_v4(),
    name    VARCHAR UNIQUE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE generator(
    id              uuid DEFAULT uuid_generate_v4(),
    active          BOOLEAN NOT NULL DEFAULT true,
    email           VARCHAR NOT NULL UNIQUE,
    registered_at   TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
    PRIMARY KEY(id)
);
COMMENT ON TABLE generator IS 'people inside this table are allowed to generate licenses';

CREATE TABLE license(
    id              uuid DEFAULT uuid_generate_v4(),
    active          BOOLEAN NOT NULL DEFAULT true,
    name            VARCHAR NOT NULL,
    max_clients     INT NOT NULL CHECK (max_clients >= -1),
    expiration      DATE NOT NULL,
    client_timeout  INT NOT NULL CHECK (client_timeout >= 0),
    org_id          uuid NOT NULL,
    generated_at    DATE NOT NULL DEFAULT CURRENT_DATE,
    generator_id    uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT license_fk_org FOREIGN KEY(org_id) REFERENCES org(id),
    CONSTRAINT license_fk_generator FOREIGN KEY(generator_id) REFERENCES generator(id)
);
COMMENT ON COLUMN license.max_clients IS 'max_clients >= -1 at all times. -1 means "unlimited clients"';
COMMENT ON COLUMN license.client_timeout IS 'client_timeout >= 0 at all times. 0 means "no timeout"';
CREATE INDEX license_active_idx ON license(active);
CREATE INDEX license_id_idx ON license USING HASH (id); -- O(1) access

CREATE TABLE license_usage(
    license_id          uuid NOT NULL,
    client_id           VARCHAR NOT NULL,
    last_ka_received_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY(license_id, client_id)
);
COMMENT ON TABLE license_usage IS 'stores the current "locks" acquired by clients using a specific license';
COMMENT ON COLUMN license_usage.client_id IS 'unique identifier for the machine that acquired the lock on the license';
COMMENT ON COLUMN license_usage.last_ka_received_at IS 'timestamp when the last keep-active message was received from client';
CREATE INDEX license_usage_license_id_idx ON license_usage(license_id);
-- index (license_id, client_id) should be automatically created since it is a primary key, right?
-- in theory all client_ids should have same length (so char type is more suitable) but since it is unknown, varchar is used
