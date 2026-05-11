--create view for macchine status
CREATE VIEW IF NOT EXISTS vw_MacchineStatus AS
SELECT 
    m.Codice,
    m.Nome,
    m.Descrizione,
    m.Categoria,
    m.Stato,
    m.UltimaManutenzione,
    m.ProssimaManutenzione,
    m.OreDiFunzionamento,
    CASE 
        WHEN m.Stato = 'Attiva' THEN 'verde'
        WHEN m.Stato = 'Manutenzione' THEN 'giallo'
        WHEN m.Stato = 'Spenta' THEN 'rosso'
    END AS ColoreStato
FROM macchine m;

--create view for tasks status
CREATE VIEW IF NOT EXISTS vw_TasksStatus AS
SELECT 
    t.Id,
    t.IdOrdine,
    t.Nome,
    t.Descrizione,
    t.DataInizio,
    t.DataFine,
    t.Stato,
    t.ProgressoPercentuale,
    t.MacchinaAssegnata,
    t.OreStimate,
    t.OreReali,
    t.CostoMateriali,
    CASE 
        WHEN t.Stato = 'Completato' THEN 'verde'
        WHEN t.Stato = 'InProduzione' THEN 'giallo'
        WHEN t.Stato = 'InCoda' THEN 'rosso'
    END AS ColoreStato
FROM tasks_produzione t;

--create view for orders status
CREATE VIEW IF NOT EXISTS vw_OrdersStatus AS
SELECT 
    o.Id,
    o.Numero,
    o.Cliente,
    o.DataRicezione,
    o.DataScadenza,
    o.Stato,
    o.ProgressoPercentuale,
    o.CostoStimato,
    o.IdResponsabile,
    CASE 
        WHEN o.Stato = 'Completato' THEN 'verde'
        WHEN o.Stato = 'InProduzione' THEN 'giallo'
        WHEN o.Stato = 'InCoda' THEN 'rosso'
    END AS ColoreStato
FROM ordini o;

--create view for operators status
CREATE VIEW IF NOT EXISTS vw_OperatorsStatus AS
SELECT 
    op.Id,
    op.Nome,
    op.Cognome,
    op.CodiceFiscale,
    op.Qualifica,
    op.AnzianitaAnni,
    op.Attivo,
    CASE 
        WHEN op.Attivo = 1 THEN 'verde'
        WHEN op.Attivo = 0 THEN 'rosso'
    END AS ColoreStato
FROM operatori op;

--create view for departments status
CREATE VIEW IF NOT EXISTS vw_DepartmentsStatus AS
SELECT 
    d.Id,
    d.Nome,
    d.Responsabile,
    CASE 
        WHEN d.Responsabile = 1 THEN 'verde'
        WHEN d.Responsabile = 2 THEN 'giallo'
        WHEN d.Responsabile = 3 THEN 'rosso'
    END AS ColoreStato
FROM dipartimenti d;

--create view for team status
CREATE VIEW IF NOT EXISTS vw_TeamStatus AS
SELECT 
    t.Id,
    t.Nome,
    t.IdDipartimento,
    t.IdOperatoreResponsabile,
    CASE 
        WHEN t.IdOperatoreResponsabile = 1 THEN 'verde'
        WHEN t.IdOperatoreResponsabile = 2 THEN 'giallo'
        WHEN t.IdOperatoreResponsabile = 3 THEN 'rosso'
    END AS ColoreStato
FROM team t;

--create view for team operators status
CREATE VIEW IF NOT EXISTS vw_TeamOperatorsStatus AS
SELECT 
    to.IdTeam,
    to.IdOperatore,
    CASE 
        WHEN to.IdOperatore = 1 THEN 'verde'
        WHEN to.IdOperatore = 2 THEN 'giallo'
        WHEN to.IdOperatore = 3 THEN 'rosso'
    END AS ColoreStato
FROM team_operatori to;

--create view for commesse status
CREATE VIEW IF NOT EXISTS vw_CommesseStatus AS
SELECT 
    c.Id,
    c.Numero,
    c.Descrizione,
    c.DataInizio,
    c.DataFine,
    c.Stato,
    c.ProgressoPercentuale,
    CASE 
        WHEN c.Stato = 'Completato' THEN 'verde'
        WHEN c.Stato = 'InProduzione' THEN 'giallo'
        WHEN c.Stato = 'InCoda' THEN 'rosso'
    END AS ColoreStato
FROM commesse c;

--create view for commesse ordini status
CREATE VIEW IF NOT EXISTS vw_CommesseOrdiniStatus AS
SELECT 
    co.IdCommesse,
    co.IdOrdine,
    CASE 
        WHEN co.IdCommesse = 1 THEN 'verde'
        WHEN co.IdCommesse = 2 THEN 'giallo'
        WHEN co.IdCommesse = 3 THEN 'rosso'
    END AS ColoreStato
FROM commesse_ordini co;

--create view for turni status
CREATE VIEW IF NOT EXISTS vw_TurniStatus AS
SELECT 
    t.Id,
    t.Nome,
    t.OraInizio,
    t.OraFine,
    t.IdOperatoreResponsabile,
    CASE 
        WHEN t.IdOperatoreResponsabile = 1 THEN 'verde'
        WHEN t.IdOperatoreResponsabile = 2 THEN 'giallo'
        WHEN t.IdOperatoreResponsabile = 3 THEN 'rosso'
    END AS ColoreStato
FROM turni t;

--create view for turni operatori status
CREATE VIEW IF NOT EXISTS vw_TurniOperatoriStatus AS
SELECT 
    to.IdTurno,
    to.IdOperatore,
    CASE 
        WHEN to.IdOperatore = 1 THEN 'verde'
        WHEN to.IdOperatore = 2 THEN 'giallo'
        WHEN to.IdOperatore = 3 THEN 'rosso'
    END AS ColoreStato
FROM turni_operatori to;

--create view for manutenzione status
CREATE VIEW IF NOT EXISTS vw_ManutenzioneStatus AS
SELECT 
    m.Id,
    m.IdMacchina,
    m.Tipo,
    m.DataInizio,
    m.DataFine,
    m.Costo,
    m.Descrizione,
    CASE 
        WHEN m.Tipo = 'Manutenzione ordinaria' THEN 'verde'
        WHEN m.Tipo = 'Manutenzione straordinaria' THEN 'giallo'
        WHEN m.Tipo = 'Manutenzione programmata' THEN 'rosso'
    END AS ColoreStato
FROM manutenzione m;

--create view for stock status
CREATE VIEW IF NOT EXISTS vw_StockStatus AS
SELECT 
    s.Id,
    s.CodiceArticolo,
    s.Nome,
    s.Descrizione,
    s.Categoria,
    s.Quantita,
    s.UnitaMisura,
    s.Prezzo,
    s.DataUltimoAggiornamento,
    CASE 
        WHEN s.Quantita = 1 THEN 'verde'
        WHEN s.Quantita = 2 THEN 'giallo'
        WHEN s.Quantita = 3 THEN 'rosso'
    END AS ColoreStato
FROM stock s;

--create view for stock movimenti status
CREATE VIEW IF NOT EXISTS vw_StockMovimentiStatus AS
SELECT 
    sm.Id,
    sm.IdArticolo,
    sm.Tipo,
    sm.Quantita,
    sm.Data,
    sm.IdOperatore,
    sm.Note,
    CASE 
        WHEN sm.Tipo = 'Entrata' THEN 'verde'
        WHEN sm.Tipo = 'Uscita' THEN 'giallo'
    END AS ColoreStato
FROM stock_movimenti sm;

--create view for fornitori status
CREATE VIEW IF NOT EXISTS vw_FornitoriStatus AS
SELECT 
    f.Id,
    f.Nome,
    f.CodiceFiscale,
    f.Qualifica,
    f.AnzianitaAnni,
    f.Attivo,
    CASE 
        WHEN f.Attivo = 1 THEN 'verde'
        WHEN f.Attivo = 0 THEN 'rosso'
    END AS ColoreStato
FROM fornitori f;

--create view for tasks with orders
CREATE VIEW IF NOT EXISTS vw_TasksWithOrders AS
SELECT 
    tp.Id,
    tp.IdOrdine,
    o.Numero AS NumeroOrdine,
    tp.Nome,
    tp.Descrizione,
    tp.DataInizio,
    tp.DataFine,
    tp.Stato,
    tp.ProgressoPercentuale,
    tp.MacchinaAssegnata,
    tp.OreStimate,
    tp.OreReali,
    tp.CostoMateriali
FROM tasks_produzione tp
JOIN ordini o ON tp.IdOrdine = o.Id;
