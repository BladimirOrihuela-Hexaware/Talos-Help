#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE licensing;
EOSQL

SQL_FILES=(/init.sql.d/*.sql)
for f in "${SQL_FILES[@]}"; do
    echo "Loading $f"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname licensing < "$f"
done
