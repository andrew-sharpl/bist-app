server {
    listen 80;
    listen [::]:80;
    server_name *.spalmurray.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name *.spalmurray.com;

    ssl_certificate /etc/letsencrypt/live/spalmurray.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spalmurray.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    add_header Strict-Transport-Security "max-age=31536000" always;
    ssl_trusted_certificate /etc/letsencrypt/live/spalmurray.com/chain.pem;
    ssl_stapling on;
    ssl_stapling_verify on;

    location /api {
        proxy_pass http://localhost:5000;
        include proxy_params;
    }
}
