-- service user (meant to be used programmatically only)
CREATE USER licensing WITH PASSWORD '45@!rS^yT3o4k&';
GRANT SELECT, INSERT, UPDATE ON license TO licensing;
GRANT SELECT, INSERT, UPDATE ON org TO licensing;
GRANT SELECT, INSERT, UPDATE, DELETE ON license_usage TO licensing; -- can and will delete rows when a lock is released
