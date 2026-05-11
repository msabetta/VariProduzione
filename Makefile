.PHONY: help setup setup-db run-api run-frontend build clean docker-build docker-run seed

# Variabili
API_DIR := ./VariProduzioneApi
FRONTEND_DIR := ./vari-produzione-frontend
DOCKER_IMAGE := vari-produzione:1.0

help:
	@echo "================================"
	@echo "🏭 Varese Production System"
	@echo "================================"
	@echo ""
	@echo "Comandi disponibili:"
	@echo ""
	@echo "  Setup Iniziale:"
	@echo "    make setup          - Configura tutto (API + Frontend)"
	@echo "    make setup-db       - Crea e inizializza database"
	@echo ""
	@echo "  Sviluppo:"
	@echo "    make run-api        - Avvia API (.NET)"
	@echo "    make run-frontend   - Avvia Frontend (React)"
	@echo "    make build          - Build production"
	@echo ""
	@echo "  Database:"
	@echo "    make seed           - Popola database con dati di test"
	@echo "    make clean-db       - Cancella database"
	@echo ""
	@echo "  Docker:"
	@echo "    make docker-build   - Build immagine Docker"
	@echo "    make docker-run     - Esegui container Docker"
	@echo ""
	@echo "  Utility:"
	@echo "    make clean          - Ripulisci artefatti build"
	@echo ""

# ============ SETUP INIZIALE ============
setup:
	@echo "🚀 Setup ambiente Varese Production System"
	@echo ""
	@echo "1️⃣  Configurando Backend..."
	@mkdir -p $(API_DIR)
	cd $(API_DIR) && dotnet new webapi -minimal --force
	cd $(API_DIR) && dotnet add package Microsoft.EntityFrameworkCore.SqlServer
	cd $(API_DIR) && dotnet add package Microsoft.EntityFrameworkCore.Tools
	cd $(API_DIR) && dotnet add package Microsoft.AspNetCore.Cors
	@echo "   ✅ Backend packages installati"
	@echo ""
	@echo "2️⃣  Configurando Frontend..."
	@npx create-react-app $(FRONTEND_DIR) --template minimal || echo "   ℹ️  React app già esistente"
	@cd $(FRONTEND_DIR) && npm install lucide-react || true
	@echo "   ✅ Frontend packages installati"
	@echo ""
	@echo "3️⃣  Copiando file di configurazione..."
	@cp appsettings.json $(API_DIR)/
	@cp ProductionTrackingApi.cs $(API_DIR)/
	@cp DbInitializer.cs $(API_DIR)/Data/
	@echo "   ✅ File configurazione copiati"
	@echo ""
	@echo "✨ Setup completato! Prossimi step:"
	@echo "   1. make setup-db  (per creare database)"
	@echo "   2. make run-api   (avviare API)"
	@echo "   3. make run-frontend (in altro terminale)"
	@echo ""

setup-db:
	@echo "🗄️  Creando database..."
	cd $(API_DIR) && dotnet ef migrations add InitialCreate
	cd $(API_DIR) && dotnet ef database update
	@echo "✅ Database creato e schema inizializzato"
	@echo ""

seed:
	@echo "🌱 Inserendo dati di test..."
	@echo "Modifica Program.cs per aggiungere:"
	@echo ""
	@echo "using VariProduzione.Data;"
	@echo ""
	@echo "// Dopo app.CreateBuilder(args)..."
	@echo "var app = builder.Build();"
	@echo ""
	@echo "// Seeding:"
	@echo "using (var scope = app.Services.CreateScope())"
	@echo "{"
	@echo "    var db = scope.ServiceProvider.GetRequiredService<ProdDbContext>();"
	@echo "    DbInitializer.Initialize(db);"
	@echo "}"
	@echo ""

clean-db:
	@echo "⚠️  Eliminando database..."
	cd $(API_DIR) && dotnet ef database drop --force
	@echo "✅ Database eliminato"
	@echo ""

# ============ ESECUZIONE ============
run-api:
	@echo "🚀 Avviando API .NET..."
	@echo "📍 http://localhost:5000"
	@echo "📚 Swagger: https://localhost:5001/scalar"
	@echo ""
	cd $(API_DIR) && dotnet run

run-frontend:
	@echo "⚛️  Avviando Frontend React..."
	@echo "📍 http://localhost:3000"
	@echo ""
	cd $(FRONTEND_DIR) && npm start

# ============ BUILD ============
build:
	@echo "🔨 Build production..."
	@echo ""
	@echo "Backend..."
	cd $(API_DIR) && dotnet publish -c Release -o ./publish
	@echo "✅ Backend pubblicato"
	@echo ""
	@echo "Frontend..."
	cd $(FRONTEND_DIR) && npm run build
	@echo "✅ Frontend compilato"
	@echo ""
	@echo "✨ Build completato!"
	@echo "   Artefatti:"
	@echo "   - API: $(API_DIR)/publish"
	@echo "   - Web: $(FRONTEND_DIR)/build"
	@echo ""

# ============ DOCKER ============
docker-build:
	@echo "🐳 Building Docker image..."
	docker build -t $(DOCKER_IMAGE) \
		--build-arg API_FRAMEWORK=net8.0 \
		.
	@echo "✅ Immagine Docker creata: $(DOCKER_IMAGE)"
	@echo ""

docker-run:
	@echo "🐳 Running Docker container..."
	docker run -it -p 5001:5000 \
		-e ConnectionStrings__DefaultConnection="Server=db;Database=VariProduzione;User Id=sa;Password=YourPassword123;" \
		$(DOCKER_IMAGE)

# ============ UTILITY ============
clean:
	@echo "🧹 Ripulendo..."
	@find . -name bin -type d -exec rm -rf {} + 2>/dev/null || true
	@find . -name obj -type d -exec rm -rf {} + 2>/dev/null || true
	@rm -rf $(API_DIR)/publish
	@rm -rf $(FRONTEND_DIR)/build
	@echo "✅ Pulizia completata"
	@echo ""

# ============ INFO ============
info:
	@echo "📊 Informazioni ambiente:"
	@echo ""
	@echo "Framework .NET:"
	@dotnet --version
	@echo ""
	@echo "Node.js:"
	@node --version
	@echo ""
	@echo "npm:"
	@npm --version
	@echo ""
	@echo "Database Engine:"
	@echo "  - SQL Server (default)"
	@echo "  - PostgreSQL (alternativo)"
	@echo ""