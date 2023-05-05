FROM postgres:15-alpine

COPY *.sh /docker-entrypoint-initdb.d/
COPY *.sql /init.sql.d/

# docker build --tag licensing-db .
# docker network create talos-help
# docker rm -f licensing-db ; docker run -e POSTGRES_PASSWORD=pass --network talos-help -p 5432:5432 --name licensing-db -it licensing-db
# docker run --network talos-help -ti postgres psql -U postgres -h licensing-db