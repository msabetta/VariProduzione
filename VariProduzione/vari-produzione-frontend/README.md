## Frontend VariProduzione
Applicazione web per la gestione della produzione e della logistica aziendale.

# Stack Tecnologico

- Typescript
- React Router DOM
- Redux Toolkit
- Zustand 
- TanStack Query 
- Axios
- Vite
- Tailwind CSS
- Formik
- Yup

# Tecnologie Utilizzate

## React
- React è un framework Javascript open source sviluppato da Meta, viene utilizzato per costruire interfacce utente.  

## React Router DOM
- React Router DOM è un framework Javascript open source sviluppato da Meta, viene utilizzata per costruire interfacce utente.  

## Redux Toolkit
- Redux Toolkit è un framework Javascript open source sviluppato da Meta, viene utilizzata per costruire interfacce utente.  

## Zustand
- Zustand è una libreria Javascript open source sviluppata da Meta, viene utilizzata per costruire interfacce utente.  

## TanStack Query
- TanStack Query è una libreria Javascript open source sviluppata da Facebook, viene utilizzata per costruire interfacce utente.  

## Axios
- Axios è una libreria Javascript open source sviluppata da Facebook, viene utilizzata per costruire interfacce utente.  

## Vite
- Vite è un tool di build per applicazioni web, viene utilizzato per costruire interfacce utente.  

## Tailwind CSS
- Tailwind CSS è un framework CSS open source sviluppato da Facebook, viene utilizzato per costruire interfacce utente.  

## Formik
- Formik è una libreria Javascript open source sviluppata da Facebook, viene utilizzata per costruire interfacce utente.  

## Yup
- Yup è un validatore di schema Javascript open source sviluppato da Facebook, viene utilizzata per costruire interfacce utente.  

## VariProduzione (Front-end) - Setup Veloce (Docker)

Questo script automatizza l'installazione delle dipendenze e l'avvio dell'applicazione in modalità sviluppo.

### Esegui questo script per installare tutto e partire subito:
```bash
#!/bin/bash

echo "##################################################"
echo "  INSTALLAZIONE DIPENDENZE E AVVIO APPLICAZIONE  "
echo "##################################################"

# Controlla se npm è installato
if ! command -v npm &> /dev/null; then
    echo "Errore: npm non è installato!"
    echo "Assicurati di avere Node.js e npm installati."
    exit 1
fi

# Vai alla cartella del progetto se non ci siamo già
if [ "$(basename "$PWD")" != "vari-produzione-frontend" ]; then
    echo "Entro nella cartella del progetto..."
    cd vari-produzione-frontend || {
        echo "Errore: non trovo la cartella 'vari-produzione-frontend'!"
        exit 1
    }
fi

# Installa le dipendenze
echo ""
echo ">>> Installazione delle dipendenze..."
npm ci --silent

if [ $? -ne 0 ]; then
    echo "Errore durante l'installazione delle dipendenze!"
    exit 1
fi

echo "✅ Dipendenze installate con successo!"
echo ""

# Avvia l'applicazione
./run_dev.sh

# Se il comando npm run dev fallisce, prova il comando manuale
if [ $? -ne 0 ]; then
    echo ""
    echo "Tentativo di avvio manuale..."
    npm run build
    npm run preview
fi
```

### Oppure, se preferisci fare manualmente:
1. **Installa le dipendenze** (esegui questo comando nella cartella del progetto):
   ```bash
   npm ci --silent
   ```

2. **Avvia l'applicazione** (in modalità sviluppo):
   ```bash
   npm run dev
   ```
   Oppure per la build di produzione:
   ```bash
   npm run build
   npm run preview
   ```

### Note Importanti:
- Assicurati di avere **Node.js** e **npm** installati sul tuo sistema
- Assicurati di essere nella cartella **vari-produzione-frontend** prima di eseguire i comandi
- La build di produzione richiede più tempo e risorse


## VariProduzione (Front-end) - Setup Manuale

1. **Installa le dipendenze** (esegui questo comando nella cartella del progetto):
   ```bash
   npm ci --silent
   ```

2. **Avvia l'applicazione** (in modalità sviluppo):
   ```bash
   npm run dev
   ```
   Oppure per la build di produzione:
   ```bash
   npm run build
   npm run preview
   ```
