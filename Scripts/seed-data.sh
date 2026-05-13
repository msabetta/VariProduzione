#!/bin/bash

# Script per caricare schema, dati e procedure nel database Docker
# Utilizzo: bash seed-data.sh [password_root]

CONTAINER_NAME="marioware-mariodb-1"
DB_NAME="marioware"
DB_USER="root"
DB_PASS=${1:-"password"} # Prende la password come primo argomento o usa "password" di default

echo "Avvio caricamento dati nel container $CONTAINER_NAME..."

# Funzione per eseguire SQL nel container
run_sql() {
    local file_path=$1
    echo "Caricamento: $file_path"
    docker exec -i "$CONTAINER_NAME" mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$file_path"
}

# 1. Schema Iniziale
run_sql "VariProduzione/Database/InitialSchema.sql"

# 2. Dati di Seed
run_sql "VariProduzione/Database/SeedData.sql"

# 3. Viste (Visto che esistono, le aggiungiamo)
run_sql "VariProduzione/Database/Views/vw_MacchineStatus.sql"
run_sql "VariProduzione/Database/Views/vw_OrdiniInRitardo.sql"

# 4. Stored Procedures (Corretti i nomi dei file esistenti)
run_sql "VariProduzione/Database/Stored Procedures/sp_GetDashboardStats.sql"
run_sql "VariProduzione/Database/Stored Procedures/sp_GetOrdiniRitardo.sql"

# Nota: Molte delle procedure precedentemente elencate nel file originale non sembrano esistere nel filesystem.
# Sono state rimosse per evitare errori di 'file not found'.

echo "Processo completato!"