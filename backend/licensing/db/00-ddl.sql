CREATE DATABASE licensing;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE org(
    id      uuid DEFAULT uuid_generate_v4(),
    name    VARCHAR NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE license(
    id              uuid DEFAULT uuid_generate_v4(),
    active          BOOLEAN NOT NULL DEFAULT true,
    name            VARCHAR NOT NULL,
    max_clients     INT NOT NULL CHECK (max_clients >= -1),
    expiration      DATE NOT NULL,
    client_timeout  INT NOT NULL CHECK (client_timeout >= 0),
    org_id          uuid NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT license_fk_org FOREIGN KEY(org_id) REFERENCES org(id)
);
COMMENT ON COLUMN license.max_clients IS 'max_clients >= -1 at all times. -1 means "unlimited clients"';
COMMENT ON COLUMN license.client_timeout IS 'client_timeout >= 0 at all times. 0 means "no timeout"';
CREATE INDEX license_active_idx ON license(active);
CREATE INDEX license_id_active_idx ON license(id, active);

CREATE TABLE license_usage(
    license_id          uuid NOT NULL,
    client_id           VARCHAR NOT NULL,
    last_ka_received_at TIMESTAMP NOT NULL,
    PRIMARY KEY(license_id, client_id)
);
COMMENT ON TABLE license_usage IS 'stores the current "locks" acquired by clients using a specific license';
COMMENT ON COLUMN license_usage.client_id IS 'unique identifier for the machine that acquired the lock on the license';
COMMENT ON COLUMN license_usage.last_ka_received_at IS 'timestamp when the last keep-active message was received from client';
-- in theory all client_ids should have same length (so char type is more suitable) but since it is unknown, varchar is used
