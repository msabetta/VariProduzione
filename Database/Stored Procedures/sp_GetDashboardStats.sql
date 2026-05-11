--create stored procedure for dashboard statistics
CREATE PROCEDURE GetDashboardStats
    @StartDate DATE,
    @EndDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    -- KPI Principali (Indicatori numerici)
    SELECT 
        SUM(TotalAmount) AS TotalRevenue,
        COUNT(OrderID) AS TotalOrders,
        AVG(TotalAmount) AS AverageOrderValue
    FROM Orders
    WHERE OrderDate BETWEEN @StartDate AND @EndDate;

    -- Dati per Grafico Lineare (Vendite per giorno)
    SELECT 
        CAST(OrderDate AS DATE) AS SaleDate,
        SUM(TotalAmount) AS DailyRevenue
    FROM Orders
    WHERE OrderDate BETWEEN @StartDate AND @EndDate
    GROUP BY CAST(OrderDate AS DATE)
    ORDER BY SaleDate;

    -- Dati per Grafico a Torta (Top 5 Categorie)
    SELECT TOP 5
        c.CategoryName,
        SUM(oi.Quantity) AS UnitsSold
    FROM OrderItems oi
    JOIN Products p ON oi.ProductID = p.ProductID
    JOIN Categories c ON p.CategoryID = c.CategoryID
    JOIN Orders o ON oi.OrderID = o.OrderID
    WHERE o.OrderDate BETWEEN @StartDate AND @EndDate
    GROUP BY c.CategoryName
    ORDER BY UnitsSold DESC;
END;
GO

--create stored procedure for machines status
CREATE PROCEDURE GetMacchineStatus
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
    FROM macchine m;
END;
GO


--create stored procedure for tasks status
CREATE PROCEDURE GetTasksStatus
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
    JOIN ordini o ON t.IdOrdine = o.Id;
END;
GO

--create stored procedure for orders status
CREATE PROCEDURE GetOrdersStatus
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
    FROM ordini o;
END;
GO

--create stored procedure for operators status
CREATE PROCEDURE GetOperatorsStatus
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
    FROM operatori op;
END;
GO

--create stored procedure for stock status
CREATE PROCEDURE GetStockStatus
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
    FROM stock s;
END;
GO

--create stored procedure for orders by date
CREATE PROCEDURE GetOrdersByDate
    @StartDate DATE,
    @EndDate DATE
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
    WHERE o.DataRicezione BETWEEN @StartDate AND @EndDate;
END;
GO

--create stored procedure for tasks by date
CREATE PROCEDURE GetTasksByDate
    @StartDate DATE,
    @EndDate DATE
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
    WHERE t.DataInizio BETWEEN @StartDate AND @EndDate;
END;
GO

--create stored procedure for machines by date
CREATE PROCEDURE GetMacchineByDate
    @StartDate DATE,
    @EndDate DATE
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
    WHERE m.UltimaManutenzione BETWEEN @StartDate AND @EndDate;
END;
GO

--create stored procedure for operators by date
CREATE PROCEDURE GetOperatorsByDate
    @StartDate DATE,
    @EndDate DATE
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
    WHERE op.DataAssunzione BETWEEN @StartDate AND @EndDate;
END;
GO

--create stored procedure for stock by date
CREATE PROCEDURE GetStockByDate
    @StartDate DATE,
    @EndDate DATE
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
    WHERE s.DataUltimoAggiornamento BETWEEN @StartDate AND @EndDate;
END;
GO