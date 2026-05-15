# Azure CLI
az group create --name vps-rg --location westeurope

az sql server create --name vps-sql --resource-group vps-rg --location westeurope --admin-user vpsadmin --admin-password YourStrong@Passw0rd123

az sql db create --name VariProduzione --server vps-sql --resource-group vps-rg --service-objective S0

az appservice plan create --name vps-plan --resource-group vps-rg --sku B1 --is-linux

az webapp create --name vps-api --resource-group vps-rg --plan vps-plan --runtime "DOTNETCORE:10.0"

az staticwebapp create --name vps-frontend --resource-group vps-rg --location westeurope --source https://github.com/msabetta/VariProduzione --branch main --app-location "VariProduzione/vari-produzione-frontend" --output-location "dist"