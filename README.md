# Talos-Help

## Description

This project is intended to redisign Talos Help tool.

## Branch policy

create a branch from `master` with format

> yourName/branch-name

# Development

## ingress-nginx

If you have Helm

```
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

If you don't have Helm or if you prefer to use a YAML manifest, you can run the following command instead:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml
```

## Match ingress hosts

Open `C:\Windows\System32\drivers\etc\hosts` and add at the end:

```
127.0.0.1 taloshelp.dev
```

or wathever value in host from infra\k8s\ingress-srv.yaml

## Execute Orchestration

in the root folder execute `microstart.sh`
You can read more about `microstart` here: https://github.com/BenjaminGuzman/microstart

After all services are up, you can access each service specifying the port.

```
client -> localhost:3000
features -> localhost:3001
...
```
