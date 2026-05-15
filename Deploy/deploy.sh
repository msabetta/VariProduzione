#!/bin/bash
# deploy.sh - Esegui sul server

# 1. Installa dipendenze
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt update
sudo apt install -y dotnet-runtime-10.0 nginx certbot python3-certbot-nginx

# 2. Clona progetto
git clone https://github.com/msabetta/VariProduzione.git /var/www/vps
cd /var/www/vps

# 3. Build backend
cd VariProduzione/VariProduzioneApi
dotnet publish -c Release -o /var/www/vps/api

# 4. Build frontend
cd ../vari-produzione-frontend
npm install
npm run build
cp -r dist/* /var/www/vps/frontend

# 5. Configura Nginx
sudo tee /etc/nginx/sites-available/vps << 'EOF'
server {
    listen 80;
    server_name tuo-dominio.com;

    location / {
        root /var/www/vps/frontend;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/vps /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 6. SSL
sudo certbot --nginx -d tuo-dominio.com

# 7. Systemd service per API
sudo tee /etc/systemd/system/vps-api.service << 'EOF'
[Unit]
Description=Varese Production System API
After=network.target

[Service]
WorkingDirectory=/var/www/vps/api
ExecStart=/usr/bin/dotnet /var/www/vps/api/VariProduzioneApi.dll
Restart=always
RestartSec=10
SyslogIdentifier=vps-api
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://localhost:5000

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable vps-api
sudo systemctl start vps-api