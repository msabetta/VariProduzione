#seed database
DELETE FROM operatori_tasks;
DELETE FROM tasks_produzione;
DELETE FROM ordini;
DELETE FROM operatori;
DELETE FROM macchine;

#seed operatori
INSERT INTO operatori (Nome, Cognome, CodiceFiscale, Qualifica, AnzianitaAnni, Attivo) VALUES
    ("Mario", "Rossi", " RSSMRA80A01H501A", "Operatore CNC", 10, true),
    ("Giulia", "Verdi", "VRDGIL90B01H501B", "Operatore CNC", 8, true),
    ("Luca", "Bianchi", "BCNLUC92C01H501C", "Operatore CNC", 6, true),
    ("Anna", "Neri", "NRAANN95D01H501D", "Operatore CNC", 5, true),
    ("Marco", "Russo", "RSSMRC88E01H501E", "Operatore CNC", 12, true);

#seed macchine
INSERT INTO macchine (Codice, Nome, Descrizione, Categoria, Stato, UltimaManutenzione, ProssimaManutenzione, OreDiFunzionamento)
VALUES 
("CNC01", "Torno CNC DMG Mori NLX 2000", "Torno ad alta precisione", "CNC", "Attiva", "2023-01-15", "2024-01-15", 1500),
("CNC02", "Fresa CNC Haas VF-3", "Fresa a 5 assi", "CNC", "Attiva", "2023-02-20", "2024-02-20", 1250),
("3DPRT01", "Stampante 3D Stratasys Fortus 450mc", "Stampa 3D FDM ad alta resistenza", "Additive Manufacturing", "Attiva", "2023-03-10", "2024-03-10", 850),
("WLD01", "Robot Saldatore KUKA KRC2", "Robot di saldatura MIG/MAG", "Saldatura", "Attiva", "2023-01-25", "2024-01-25", 1800),
("ASSMBLY01", "Linea Assemblaggio Hermes", "Linea di assemblaggio modulare", "Assemblaggio", "Manutenzione", "2023-03-01", "2024-03-01", 900);

#seed ordini
INSERT INTO ordini (Numero, Cliente, DataRicezione, DataScadenza, Stato, ProgressoPercentuale, CostoStimato, IdResponsabile)
VALUES 
("ORD-2024-001", "Tesar S.p.A.", "2024-01-05", "2024-02-15", "InProduzione", 45, 25000.00, 1),
("ORD-2024-002", "Pirelli", "2024-01-08", "2024-03-01", "Pianificato", 0, 18000.00, 2),
("ORD-2024-003", "Ferrari Components", "2024-01-02", "2024-01-30", "Completato", 100, 12000.00, 1),
("ORD-2024-004", "Valcar Transport", "2024-01-10", "2024-02-20", "InCoda", 10, 8500.00, 3);

#seed tasks
INSERT INTO tasks_produzione (IdOrdine, Nome, Descrizione, DataInizio, DataFine, Stato, ProgressoPercentuale, MacchinaAssegnata, OreStimate, OreReali, CostoMateriali)
VALUES 
(1, "Lavorazione base", "Lavorazione principale su tornio CNC", "2024-01-05", "2024-01-15", "Completato", 100, 1, 40, 45, 5000.00),
(1, "Finitura superficiale", "Trattamento superficiale e lucidatura", "2024-01-16", "2024-01-20", "InProduzione", 60, 2, 20, 12, 1500.00),
(2, "Stampa 3D prototipo", "Stampa prototipo in resina", "2024-01-10", "2024-01-15", "InCoda", 0, 3, 24, 0, 3200.00),
(3, "Controllo qualità", "Ispezione dimensionale e funzionale", "2024-01-03", "2024-01-05", "Completato", 100, 2, 8, 7, 800.00);

#seed operatori_tasks
INSERT INTO operatori_tasks (IdOperatore, IdTask)
VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4);

#seed dipartimenti
INSERT INTO dipartimenti (Nome, Responsabile)
VALUES 
("Produzione", 1),
("Qualità", 2),
("Manutenzione", 3),
("Logistica", 4),
("Amministrazione", 5);

#seed team
INSERT INTO team (Nome, IdDipartimento, IdOperatoreResponsabile)
VALUES 
("Team Produzione", 1, 1),
("Team Qualità", 2, 2),
("Team Manutenzione", 3, 3),
("Team Logistica", 4, 4),
("Team Amministrazione", 5, 5);


#seed team_operatori
INSERT INTO team_operatori (IdTeam, IdOperatore)
VALUES 
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

#seed commesse
INSERT INTO commesse (Numero, Descrizione, DataInizio, DataFine, Stato, ProgressoPercentuale)
VALUES 
("COMM-2024-001", "Commessa 1", "2024-01-05", "2024-02-15", "InProduzione", 45),
("COMM-2024-002", "Commessa 2", "2024-01-08", "2024-03-01", "Pianificato", 0),
("COMM-2024-003", "Commessa 3", "2024-01-02", "2024-01-30", "Completato", 100),
("COMM-2024-004", "Commessa 4", "2024-01-10", "2024-02-20", "InCoda", 10);

#seed commesse_ordini
INSERT INTO commesse_ordini (IdCommesse, IdOrdine)
VALUES 
(1, 1),
(1, 2),
(2, 3),
(3, 4);

#seed turni
INSERT INTO turni (Nome, OraInizio, OraFine, IdOperatoreResponsabile)
VALUES 
("Turno Mattina", "06:00", "14:00", 1),
("Turno Pomeriggio", "14:00", "22:00", 2),
("Turno Notte", "22:00", "06:00", 3);

#seed turni_operatori
INSERT INTO turni_operatori (IdTurno, IdOperatore)
VALUES 
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

#seed manutenzione
INSERT INTO manutenzione (IdMacchina, Tipo, DataInizio, DataFine, Costo, Descrizione)
VALUES 
(1, "Manutenzione ordinaria", "2024-01-05", "2024-01-15", 5000.00, "Manutenzione ordinaria tornio CNC"),
(2, "Manutenzione straordinaria", "2024-01-16", "2024-01-20", 1500.00, "Manutenzione straordinaria fresa CNC"),
(3, "Manutenzione programmata", "2024-01-10", "2024-01-15", 3200.00, "Manutenzione programmata stampante 3D"),
(4, "Manutenzione di emergenza", "2024-01-03", "2024-01-05", 800.00, "Manutenzione di emergenza robot saldatore"),
(5, "Manutenzione ordinaria", "2024-01-05", "2024-01-15", 5000.00, "Manutenzione ordinaria linea assemblaggio");

#seed stock
INSERT INTO stock (CodiceArticolo, Nome, Descrizione, Categoria, Quantita, UnitaMisura, Prezzo, DataUltimoAggiornamento)
VALUES 
("ART-001", "Acciaio Inox 316L", "Acciaio inox per lavorazioni meccaniche", "Materiali metallici", 1000, "kg", 5.00, "2024-01-05"),
("ART-002", "Alluminio 6061", "Alluminio per lavorazioni meccaniche", "Materiali metallici", 500, "kg", 3.00, "2024-01-05"),
("ART-003", "Plastica ABS", "Plastica per stampa 3D", "Materiali polimerici", 200, "kg", 2.00, "2024-01-05"),
("ART-004", "Resina UV", "Resina per stampa 3D", "Materiali polimerici", 50, "kg", 4.00, "2024-01-05"),
("ART-005", "Viti M8", "Viti metriche M8", "Componenti meccanici", 1000, "pz", 0.10, "2024-01-05");

#seed stock_movimenti
INSERT INTO stock_movimenti (IdArticolo, Tipo, Quantita, Data, IdOperatore, Note)
VALUES 
(1, "Entrata", 100, "2024-01-05", 1, "Ricevimento stock"),
(2, "Entrata", 50, "2024-01-05", 1, "Ricevimento stock"),
(3, "Uscita", 20, "2024-01-05", 1, "Utilizzo stock"),
(4, "Uscita", 10, "2024-01-05", 1, "Utilizzo stock"),
(5, "Uscita", 5, "2024-01-05", 1, "Utilizzo stock");

#seed fornitori
INSERT INTO fornitori (Nome, PartitaIVA, Indirizzo, Telefono, Email, DataRegistrazione)
VALUES 
("Acciai Speciali S.p.A.", "IT01234567890", "Via Acciai 1", "+390123456789", "[EMAIL_ADDRESS]", "2024-01-05"),
("Alluminio Italia", "IT01234567891", "Via Alluminio 2", "+390123456790", "[EMAIL_ADDRESS]", "2024-01-05"),
("Plastica Globale", "IT01234567892", "Via Plastica 3", "+390123456791", "[EMAIL_ADDRESS]", "2024-01-05"),
("Resine Tech", "IT01234567893", "Via Resine 4", "+390123456792", "[EMAIL_ADDRESS]", "2024-01-05"),
("Ferramenta Centrale", "IT01234567894", "Via Ferramenta 5", "+390123456793", "[EMAIL_ADDRESS]", "2024-01-05");

#seed fornitori_articoli
INSERT INTO fornitori_articoli (IdFornitore, IdArticolo)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

#seed clienti
INSERT INTO clienti (Nome, PartitaIVA, Indirizzo, Telefono, Email, DataRegistrazione)
VALUES 
("Tesar S.p.A.", "IT01234567895", "Via Clienti 1", "+390123456794", "[EMAIL_ADDRESS]", "2024-01-05"),
("Pirelli", "IT01234567896", "Via Clienti 2", "+390123456795", "[EMAIL_ADDRESS]", "2024-01-05"),
("Ferrari Components", "IT01234567897", "Via Clienti 3", "+390123456796", "[EMAIL_ADDRESS]", "2024-01-05"),
("Valcar Transport", "IT01234567898", "Via Clienti 4", "+390123456797", "[EMAIL_ADDRESS]", "2024-01-05"),
("Manifattura Meccanica", "IT01234567899", "Via Clienti 5", "+390123456798", "[EMAIL_ADDRESS]", "2024-01-05");

#seed commesse_clienti
INSERT INTO commesse_clienti (IdCommesse, IdCliente)
VALUES 
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

#seed cespiti
INSERT INTO cespiti (CodiceCespiti, Descrizione, DataAcquisto, DataFineGaranzia, ValoreContabile, IdMacchina)
VALUES 
("ESP-001", "Torno CNC DMG Mori NLX 2000", "2023-01-15", "2024-01-15", 1500, 1),
("ESP-002", "Fresa CNC Haas VF-3", "2023-02-20", "2024-02-20", 1250, 2),
("ESP-003", "Stampante 3D Stratasys Fortus 450mc", "2023-03-10", "2024-03-10", 850, 3),
("ESP-004", "Robot Saldatore KUKA KRC2", "2023-01-25", "2024-01-25", 1800, 4),
("ESP-005", "Linea Assemblaggio Hermes", "2023-03-01", "2024-03-01", 900, 5);

#seed costi_produzione
INSERT INTO costi_produzione (IdTask, IdMacchina, CostoOrario, OreLavorate, CostoTotale, IdArticolo, Quantita, CostoMateriali, Data)
VALUES 
(1, 1, 10, 45, 450, 1, 100, 5000, "2024-01-05"),
(2, 2, 12, 12, 144, 2, 50, 1500, "2024-01-05"),
(3, 3, 8, 24, 192, 3, 200, 3200, "2024-01-05"),
(4, 4, 15, 7, 105, 4, 50, 2000, "2024-01-05"),
(5, 5, 9, 30, 270, 5, 1000, 1000, "2024-01-05");

#seed qualità
INSERT INTO qualita (IdTask, Risultato, Note, Data, IdOperatore) 
VALUES 
(1, "Conforme", "Nessuna non conformità", "2024-01-05", 2),
(2, "Non Conforme", "Lieve scostamento dimensionale", "2024-01-05", 2),
(3, "Conforme", "Nessuna non conformità", "2024-01-05", 2),
(4, "Non Conforme", "Scostamento dimensionale significativo", "2024-01-05", 2),
(5, "Conforme", "Nessuna non conformità", "2024-01-05", 2);

