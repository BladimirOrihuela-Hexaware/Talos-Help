FROM postgres:15-alpine

COPY *.sql /docker-entrypoint-initdb.d/

# docker build --tag licensing-db .
# docker network create talos-help
# docker rm -f licensing-db ; docker run -e POSTGRES_PASSWORD=pass --network talos-help --name licensing-db -d licensing-db
# docker run --network talos-help -ti postgres psql -U postgres -h licensing-db