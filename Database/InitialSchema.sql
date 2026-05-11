#initial schema for database production

-- drop tables
DROP TABLE IF EXISTS operatori_tasks;
DROP TABLE IF EXISTS tasks_produzione;
DROP TABLE IF EXISTS ordini;
DROP TABLE IF EXISTS operatori;
DROP TABLE IF EXISTS macchine;

--create table operatori
CREATE TABLE IF NOT EXISTS operatori (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    Cognome VARCHAR(50) NOT NULL,
    CodiceFiscale VARCHAR(16) NOT NULL,
    Qualifica VARCHAR(50) NOT NULL,
    AnzianitaAnni INT NOT NULL,
    Attivo BOOLEAN NOT NULL
);

--create table macchine
CREATE TABLE IF NOT EXISTS macchine (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Codice VARCHAR(50) NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    Descrizione TEXT,
    Categoria VARCHAR(50) NOT NULL,
    Stato VARCHAR(50) NOT NULL,
    UltimaManutenzione DATE,
    ProssimaManutenzione DATE,
    OreDiFunzionamento INT NOT NULL
);

--create table ordini
CREATE TABLE IF NOT EXISTS ordini (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Numero VARCHAR(50) NOT NULL,
    Cliente VARCHAR(50) NOT NULL,
    DataRicezione DATE NOT NULL,
    DataScadenza DATE NOT NULL,
    Stato VARCHAR(50) NOT NULL,
    ProgressoPercentuale INT NOT NULL,
    CostoStimato DECIMAL(10,2) NOT NULL,
    IdResponsabile INT NOT NULL,
    FOREIGN KEY (IdResponsabile) REFERENCES operatori(Id)
);

--create table tasks_produzione
CREATE TABLE IF NOT EXISTS tasks_produzione (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdOrdine INT NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    Descrizione TEXT,
    DataInizio DATE NOT NULL,
    DataFine DATE NOT NULL,
    Stato VARCHAR(50) NOT NULL,
    ProgressoPercentuale INT NOT NULL,
    MacchinaAssegnata VARCHAR(50) NOT NULL,
    OreStimate INT NOT NULL,
    OreReali INT NOT NULL,
    CostoMateriali DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (IdOrdine) REFERENCES ordini(Id)
);

--create table operatori_tasks
CREATE TABLE IF NOT EXISTS operatori_tasks (
    IdOperatore INT NOT NULL,
    IdTask INT NOT NULL,
    PRIMARY KEY (IdOperatore, IdTask),
    FOREIGN KEY (IdOperatore) REFERENCES operatori(Id),
    FOREIGN KEY (IdTask) REFERENCES tasks_produzione(Id)
);

--create table dipartimenti
CREATE TABLE IF NOT EXISTS dipartimenti (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    Responsabile INT NOT NULL,
    FOREIGN KEY (Responsabile) REFERENCES operatori(Id)
);

--create table team
CREATE TABLE IF NOT EXISTS team (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    IdDipartimento INT NOT NULL,
    IdOperatoreResponsabile INT NOT NULL,
    FOREIGN KEY (IdDipartimento) REFERENCES dipartimenti(Id),
    FOREIGN KEY (IdOperatoreResponsabile) REFERENCES operatori(Id)
);

--create table team_operatori
CREATE TABLE IF NOT EXISTS team_operatori (
    IdTeam INT NOT NULL,
    IdOperatore INT NOT NULL,
    PRIMARY KEY (IdTeam, IdOperatore),
    FOREIGN KEY (IdTeam) REFERENCES team(Id),
    FOREIGN KEY (IdOperatore) REFERENCES operatori(Id)
);

--create table commesse
CREATE TABLE IF NOT EXISTS commesse (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Numero VARCHAR(50) NOT NULL,
    Descrizione TEXT,
    DataInizio DATE NOT NULL,
    DataFine DATE NOT NULL,
    Stato VARCHAR(50) NOT NULL,
    ProgressoPercentuale INT NOT NULL
);

--create table commesse_ordini
CREATE TABLE IF NOT EXISTS commesse_ordini (
    IdCommesse INT NOT NULL,
    IdOrdine INT NOT NULL,
    PRIMARY KEY (IdCommesse, IdOrdine),
    FOREIGN KEY (IdCommesse) REFERENCES commesse(Id),
    FOREIGN KEY (IdOrdine) REFERENCES ordini(Id)
);

--create table turni
CREATE TABLE IF NOT EXISTS turni (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    OraInizio TIME NOT NULL,
    OraFine TIME NOT NULL,
    IdOperatoreResponsabile INT NOT NULL,
    FOREIGN KEY (IdOperatoreResponsabile) REFERENCES operatori(Id)
);

--create table turni_operatori
CREATE TABLE IF NOT EXISTS turni_operatori (
    IdTurno INT NOT NULL,
    IdOperatore INT NOT NULL,
    PRIMARY KEY (IdTurno, IdOperatore),
    FOREIGN KEY (IdTurno) REFERENCES turni(Id),
    FOREIGN KEY (IdOperatore) REFERENCES operatori(Id)
);

--create table manutenzione
CREATE TABLE IF NOT EXISTS manutenzione (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdMacchina INT NOT NULL,
    Tipo VARCHAR(50) NOT NULL,
    DataInizio DATE NOT NULL,
    DataFine DATE NOT NULL,
    Costo DECIMAL(10,2) NOT NULL,
    Descrizione TEXT,
    FOREIGN KEY (IdMacchina) REFERENCES macchine(Id)
);

--create table stock
CREATE TABLE IF NOT EXISTS stock (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CodiceArticolo VARCHAR(50) NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    Descrizione TEXT,
    Categoria VARCHAR(50) NOT NULL,
    Quantita INT NOT NULL,
    UnitaMisura VARCHAR(50) NOT NULL,
    Prezzo DECIMAL(10,2) NOT NULL,
    DataUltimoAggiornamento DATE NOT NULL
);

--create table stock_movimenti
CREATE TABLE IF NOT EXISTS stock_movimenti (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdArticolo INT NOT NULL,
    Tipo VARCHAR(50) NOT NULL,
    Quantita INT NOT NULL,
    Data DATE NOT NULL,
    IdOperatore INT NOT NULL,
    Note TEXT,
    FOREIGN KEY (IdArticolo) REFERENCES stock(Id),
    FOREIGN KEY (IdOperatore) REFERENCES operatori(Id)
);


--create table fornitori
CREATE TABLE IF NOT EXISTS fornitori (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL,
    CodiceFiscale VARCHAR(16) NOT NULL,
    Qualifica VARCHAR(50) NOT NULL,
    AnzianitaAnni INT NOT NULL,
    Attivo BOOLEAN NOT NULL
);  

