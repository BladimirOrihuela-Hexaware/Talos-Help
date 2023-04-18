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

## Skaffold

We'll use https://skaffold.dev/ to orchestrate our services.

1. You can download it from [`sharepoint`](https://hexawareonline.sharepoint.com/:u:/r/sites/ATP/Shared%20Documents/General/Dev%20-%20Installers/skaffold.exe?csf=1&web=1&e=HaaPcW)
2. Make sure the .exe file is named `skaffold.exe`
3. Move `skaffold.exe` to `C:\Program Files\skaffold`
4. Add `C:\Program Files\skaffold` to the $PATH env variable

## Execute Orchestration

in the root folder run

```
skaffold dev
```

After all services are up, you can access in the browser on https://taloshelp.dev/

due to the browser is attepting to reach a DNS that doesn't have a valid Certificate, you might see a `Your connection isn't private` message on the browser. Click on a blank space in the page and type: `thisisunsafe` and press enter.

This should ignore the certificate concern. Which is ok in this environment.
