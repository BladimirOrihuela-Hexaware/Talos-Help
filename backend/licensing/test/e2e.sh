# start database
docker rm -f licensing-db-test 2> /dev/null || exit 1
docker run -e POSTGRES_PASSWORD=pass --network talos-help -p 5432:5432 --name licensing-db-test -d licensing-db || exit 1

# run tests
npm run test:e2e

docker rm -f licensing-db-test