namespace VariProduzioneApi.Models
{
    public enum StatoOrdine
    {
        Pianificato,
        InProduzione,
        Completato,
        Ritardato,
        InCoda
    }

    public enum StatoTask
    {
        NonIniziato,   // CORREZIONE: Verificato - corretto (non "NonInizziato")
        InCoda,
        InCorso,
        Completato,
        Bloccato
    }

    public enum StatoMacchina
    {
        Disponibile,
        Operativa,
        Manutenzione,
        Guasto
    }
}