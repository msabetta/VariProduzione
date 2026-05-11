--create view for orders in delay
CREATE VIEW IF NOT EXISTS vw_OrdiniInRitardo AS
SELECT 
    o.Id,
    o.Numero,
    o.Cliente,
    o.DataRicezione,
    o.DataScadenza,
    o.Stato,
    o.ProgressoPercentuale,
    o.CostoStimato,
    o.IdResponsabile
FROM ordini o
WHERE o.Stato = 'InProduzione' AND o.DataScadenza < CURRENT_DATE();

--create view for tasks in delay
CREATE VIEW IF NOT EXISTS vw_TasksInRitardo AS
SELECT 
    tp.Id,
    tp.IdOrdine,
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
WHERE tp.Stato = 'InProduzione' AND tp.DataFine < CURRENT_DATE();

--create view for stock near reorder point
CREATE VIEW IF NOT EXISTS vw_StockNearReorder AS
SELECT 
    s.Id,
    s.CodiceArticolo,
    s.Nome,
    s.Descrizione,
    s.Categoria,
    s.Quantita,
    s.UnitaMisura,
    s.Prezzo,
    s.DataUltimoAggiornamento
FROM stock s
WHERE s.Quantita < s.ReorderPoint;

--create view for machines with maintenance due
CREATE VIEW IF NOT EXISTS vw_MacchineManutenzioneDovuta AS
SELECT 
    m.Id,
    m.Codice,
    m.Nome,
    m.Descrizione,
    m.Categoria,
    m.Stato,
    m.UltimaManutenzione,
    m.ProssimaManutenzione,
    m.OreDiFunzionamento
FROM macchine m
WHERE m.ProssimaManutenzione < CURRENT_DATE();

--create view for stock movements with operator names
CREATE VIEW IF NOT EXISTS vw_StockMovimentiConOperatori AS
SELECT 
    sm.Id,
    sm.IdArticolo,
    s.Nome AS NomeArticolo,
    sm.Tipo,
    sm.Quantita,
    sm.Data,
    op.Nome AS NomeOperatore,
    op.Cognome AS CognomeOperatore,
    sm.Note
FROM stock_movimenti sm
JOIN stock s ON sm.IdArticolo = s.Id
JOIN operatori op ON sm.IdOperatore = op.Id;

--create view for maintenance with machine and operator names
CREATE VIEW IF NOT EXISTS vw_ManutenzioneConMacchinaOperatori AS
SELECT 
    m.Id,
    m.IdMacchina,
    mac.Nome AS NomeMacchina,
    m.Tipo,
    m.DataInizio,
    m.DataFine,
    m.Costo,
    m.Descrizione
FROM manutenzione m
JOIN macchine mac ON m.IdMacchina = mac.Id;

--create view for team operators
CREATE VIEW IF NOT EXISTS vw_TeamOperatori AS
SELECT 
    to.IdTeam,
    t.Nome AS NomeTeam,
    to.IdOperatore,
    op.Nome AS NomeOperatore,
    op.Cognome AS CognomeOperatore
FROM team_operatori to
JOIN team t ON to.IdTeam = t.Id
JOIN operatori op ON to.IdOperatore = op.Id;

--create view for turni operatori
CREATE VIEW IF NOT EXISTS vw_TurniOperatori AS
SELECT 
    to.IdTurno,
    t.Nome AS NomeTurno,
    to.IdOperatore,
    op.Nome AS NomeOperatore,
    op.Cognome AS CognomeOperatore
FROM turni_operatori to
JOIN turni t ON to.IdTurno = t.Id
JOIN operatori op ON to.IdOperatore = op.Id;


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

--create view for tasks with machine and order data
CREATE VIEW IF NOT EXISTS vw_TasksWithMachineAndOrder AS
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
    mac.Nome AS NomeMacchina,
    mac.Descrizione AS DescrizioneMacchina,
    mac.Categoria AS CategoriaMacchina,
    mac.Stato AS StatoMacchina,
    mac.UltimaManutenzione,
    mac.ProssimaManutenzione,
    mac.OreDiFunzionamento,
    tp.OreStimate,
    tp.OreReali,
    tp.CostoMateriali
FROM tasks_produzione tp
JOIN ordini o ON tp.IdOrdine = o.Id
JOIN macchine mac ON tp.MacchinaAssegnata = mac.Id;

--create view for operators with tasks
CREATE VIEW IF NOT EXISTS vw_OperatoriWithTasks AS
SELECT 
    op.Id,
    op.Nome,
    op.Cognome,
    op.CodiceFiscale,
    op.Qualifica,
    op.AnzianitaAnni,
    op.Attivo,
    COUNT(ot.IdTask) AS NumeroTask,
    SUM(CASE WHEN tp.Stato = 'Completato' THEN 1 ELSE 0 END) AS TaskCompletati,
    SUM(CASE WHEN tp.Stato = 'InProduzione' THEN 1 ELSE 0 END) AS TaskInProduzione,
    SUM(CASE WHEN tp.Stato = 'InCoda' THEN 1 ELSE 0 END) AS TaskInCoda
FROM operatori op
JOIN operatori_tasks ot ON op.Id = ot.IdOperatore
JOIN tasks_produzione tp ON ot.IdTask = tp.Id
GROUP BY op.Id;

--create view for machines with tasks
CREATE VIEW IF NOT EXISTS vw_MacchineWithTasks AS
SELECT 
    mac.Id,
    mac.Codice,
    mac.Nome,
    mac.Descrizione,
    mac.Categoria,
    mac.Stato,
    mac.UltimaManutenzione,
    mac.ProssimaManutenzione,
    mac.OreDiFunzionamento,
    COUNT(tp.Id) AS NumeroTask,
    SUM(CASE WHEN tp.Stato = 'Completato' THEN 1 ELSE 0 END) AS TaskCompletati,
    SUM(CASE WHEN tp.Stato = 'InProduzione' THEN 1 ELSE 0 END) AS TaskInProduzione,
    SUM(CASE WHEN tp.Stato = 'InCoda' THEN 1 ELSE 0 END) AS TaskInCoda
FROM macchine mac
JOIN tasks_produzione tp ON mac.Id = tp.MacchinaAssegnata
GROUP BY mac.Id;

--create view for orders with tasks
CREATE VIEW IF NOT EXISTS vw_OrdiniWithTasks AS
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
    COUNT(tp.Id) AS NumeroTask,
    SUM(CASE WHEN tp.Stato = 'Completato' THEN 1 ELSE 0 END) AS TaskCompletati,
    SUM(CASE WHEN tp.Stato = 'InProduzione' THEN 1 ELSE 0 END) AS TaskInProduzione,
    SUM(CASE WHEN tp.Stato = 'InCoda' THEN 1 ELSE 0 END) AS TaskInCoda,
    SUM(tp.OreReali) AS OreTotaliReali,
    SUM(tp.OreStimate) AS OreTotaliStimate,
    SUM(tp.CostoMateriali) AS CostoTotaleMateriali
FROM ordini o
LEFT JOIN tasks_produzione tp ON o.Id = tp.IdOrdine
GROUP BY o.Id;

--create view for stock with reorder point
CREATE VIEW IF NOT EXISTS vw_StockWithReorderPoint AS
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
    s.ReorderPoint,
    s.StockAlert
FROM stock s;

--create view for stock movements with stock and operator data
CREATE VIEW IF NOT EXISTS vw_StockMovimentiConStockAndOperatori AS
SELECT 
    sm.Id,
    sm.IdArticolo,
    s.Nome AS NomeArticolo,
    s.Descrizione AS DescrizioneArticolo,
    s.Categoria AS CategoriaArticolo,
    s.Quantita AS QuantitaArticolo,
    s.UnitaMisura AS UnitaMisuraArticolo,
    s.Prezzo AS PrezzoArticolo,
    sm.Tipo,
    sm.Quantita,
    sm.Data,
    op.Nome AS NomeOperatore,
    op.Cognome AS CognomeOperatore,
    sm.Note
FROM stock_movimenti sm
JOIN stock s ON sm.IdArticolo = s.Id
JOIN operatori op ON sm.IdOperatore = op.Id;
