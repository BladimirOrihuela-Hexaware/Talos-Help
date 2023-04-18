I'd recommend to simply mount a volume using the default nginx server:

```sh
docker run --name static-content -v /volume/with/all/static/content/:/usr/share/nginx/html:ro nginx:stable-alpine
```