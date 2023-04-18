# Talos-Help

## Description

This project is intended to redisign Talos Help tool.

## Branch policy

create a branch from `master` with format

> yourName/branch-name

## Development

Update
`C:\Windows\System32\drivers\etc\hosts`

```
127.0.0.1 taloshelp.dev
```

or wathever value in host from infra\k8s\ingress-srv.yaml

We'll use https://skaffold.dev/ to orchestrate our services. You can download it from [`sharepoint`](https://hexawareonline.sharepoint.com/:u:/r/sites/ATP/Shared%20Documents/General/Dev%20-%20Installers/skaffold-windows-amd64.exe?csf=1&web=1&e=SSQouW)
