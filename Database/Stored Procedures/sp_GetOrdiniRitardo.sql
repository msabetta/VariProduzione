--create stored procedure for orders on delay
CREATE PROCEDURE GetOrdiniRitardo
    @Date DATE
AS
BEGIN
    SET NOCOUNT ON;

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
    FROM ordini o
    WHERE o.DataScadenza < @Date AND o.Stato <> 'Completato';
END;
GO

--create stored procedure for tasks on delay
CREATE PROCEDURE GetTasksRitardo
    @Date DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        t.Id,
        t.IdOrdine,
        o.Numero AS NumeroOrdine,
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
    FROM tasks_produzione t
    JOIN ordini o ON t.IdOrdine = o.Id
    WHERE t.DataFine < @Date AND t.Stato <> 'Completato';
END;
GO

--create stored procedure for machines on delay
CREATE PROCEDURE GetMacchineRitardo
    @Date DATE
AS
BEGIN
    SET NOCOUNT ON;

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
    FROM macchine m
    WHERE m.ProssimaManutenzione < @Date AND m.Stato <> 'Spenta';
END;
GO

--create stored procedure for operators on delay
CREATE PROCEDURE GetOperatoriRitardo
    @Date DATE
AS
BEGIN
    SET NOCOUNT ON;

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
    FROM operatori op
    WHERE op.DataAssunzione < @Date AND op.Attivo = 1;
END;
GO

--create stored procedure for stock on delay
CREATE PROCEDURE GetStockRitardo
    @Date DATE
AS
BEGIN
    SET NOCOUNT ON;

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
    FROM stock s
    WHERE s.DataUltimoAggiornamento < @Date;
END;
GO

--create stored procedure for tasks not completed
CREATE PROCEDURE GetTasksNonCompletati
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        t.Id,
        t.IdOrdine,
        o.Numero AS NumeroOrdine,
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
    FROM tasks_produzione t
    JOIN ordini o ON t.IdOrdine = o.Id
    WHERE t.Stato <> 'Completato';
END;
GO

--create stored procedure for tasks completed
CREATE PROCEDURE GetTasksCompletati
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        t.Id,
        t.IdOrdine,
        o.Numero AS NumeroOrdine,
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
    FROM tasks_produzione t
    JOIN ordini o ON t.IdOrdine = o.Id
    WHERE t.Stato = 'Completato';
END;
GO
