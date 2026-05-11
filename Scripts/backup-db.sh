#!/bin/bash

# Script per il backup del database nel container Docker

CONTAINER_NAME="marioware-mariodb-1"
DB_NAME="marioware"
DB_USER="root"
DB_PASS="password" # Da cambiare con la password reale o passare come variabile
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"

echo "Avvio backup del database $DB_NAME dal container $CONTAINER_NAME..."

docker exec "$CONTAINER_NAME" mysqldump -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "Backup completato con successo: $BACKUP_FILE"
else
    echo "Errore durante il backup."
fi
