namespace VariProduzioneApi.Models
{
    public enum StatoOrdine
    {
        Pianificato,
        InProduzione,
        InCoda,
        Completato,
        Ritardato,
        Sospeso
    }

    public enum StatoTask
    {
        NonInizziato,
        InCorsso,
        InCoda,
        Completato,
        Bloccato
    }

    public enum StatoMacchina
    {
        Operativa,
        Manutenzione,
        Guasto,
        Ferma
    }
}