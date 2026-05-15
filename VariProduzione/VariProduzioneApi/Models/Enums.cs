namespace VariProduzioneApi.Models;

public enum StatoOrdine
{
    Bozza,
    Confermato,
    InProduzione,
    Completato,
    Annullato,
    Ritardato
}

public enum StatoMacchina
{
    Disponibile,
    InUso,
    Manutenzione,
    FuoriServizio,
    Operativa
}

public enum StatoTask
{
    DaFare,
    InCorso,
    Completato,
    Bloccato
}

public enum PrioritaTask
{
    Bassa,
    Media,
    Alta,
    Critica
}