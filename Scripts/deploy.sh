#!/bin/bash

# Script per il deploy in produzione

COMPOSE_FILE="docker-compose.prod.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
    echo "Errore: $COMPOSE_FILE non trovato nella cartella corrente."
    exit 1
fi

echo "Avvio deploy in modalità produzione..."
docker compose -f "$COMPOSE_FILE" up --build -d

echo "Deploy completato!"