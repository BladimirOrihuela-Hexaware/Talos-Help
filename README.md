# Talos-Help

## Description

This project is intended to redisign Talos Help tool.

## Branch policy

create a branch from `master` with format

> yourName/branch-name

# Development

**Documentation**: TODO paste documentation links when this repo gets re-authored.

## Orchestration

`microstart.jar`

> CLI utility to start various processes in parallel with a start sequence.

Executing `microstart.sh` within the root folder will run **all services**

If you don't need to run all services, update `config.yml`.

```
services:
      - licensing
      - actions
      - features // comment or remove the service you don't need But keep the changes locally.
      - client
```

After the services are up, you can access each service by port.

```
features -> localhost:3001
actions -> localhost:3002
licensing -> localhost:3003
client -> localhost:3000
```

You can read more about `microstart` here: https://github.com/BenjaminGuzman/microstart
