import * as Color from "color";
import { StatoOrdine, StatoTask, StatoMacchina } from "./Enums";
import { Enums } from "./Types";

/**
 * Colore di sfondo in base allo stato
 */
const getBackgroundColor = (state, prefix = "stato") => {
    switch (state) {
        case StatoMacchina.Operativa:
            return "var(--color-success-light)";
        case StatoMacchina.InManutenzione:
            return "var(--color-warning-light)";
        case StatoMacchina.FuoriServizio:
            return "var(--color-danger-light)";
        default:
            return "var(--color-neutral-light)";
    }
}

/**
 * Colore del testo in base allo stato
 */
const getTextColor = (state, prefix = "stato") => {
    switch (state) {
        case StatoMacchina.Operativa:
            return "var(--color-success-dark)";
        case StatoMacchina.InManutenzione:
            return "var(--color-warning-dark)";
        case StatoMacchina.FuoriServizio:
            return "var(--color-danger-dark)";
        default:
            return "var(--color-neutral-dark)";
    }
}

/**
 * Calcola l'opacità in base al valore
 * @param {number} val Valore da cui calcolare l'opacità
 * @param {number} targetOpacity Opacità target
 * @param {number} min Opacità minima
 * @returns {number} Opacità calcolata
 */
function getBgOpacity(val, targetOpacity = 80, min = 5) {
    return Math.max(min, targetOpacity - (val * (targetOpacity - min)));
}

/**
 * Colore di sfondo in base al colore base e all'opacità
 * @param {string} baseColor Colore base
 * @param {number} opacity Opacità
 * @returns {string} Colore di sfondo calcolato
 */
function getBgColor(baseColor, opacity) {
    return `color-mix(in srgb, var(--color-${baseColor}) ${opacity}%, transparent)`;
}

/**
 * Colori di stato per macchine, ordini e task
 */
export const StatusColors = {
    [StatoMacchina.Operativa]: { bg: "--color-success-light", text: "--color-success-dark", label: "Operativa", className: "stato-operativa" },
    [StatoMacchina.InManutenzione]: { bg: "--color-warning-light", text: "--color-warning-dark", label: "In Manutenzione", className: "stato-in-manutenzione" },
    [StatoMacchina.FuoriServizio]: { bg: "--color-danger-light", text: "--color-danger-dark", label: "Fuori Servizio", className: "stato-fuori-servizio" },
    [StatoMacchina.NonAssegnata]: { bg: "--color-info-light", text: "--color-info-dark", label: "Non Assegnata", className: "stato-non-assegnata" },

    [StatoOrdine.InLavorazione]: { bg: "--color-info-light", text: "--color-info-dark", label: "In Lavorazione", className: "stato-in-lavorazione" },
    [StatoOrdine.Completato]: { bg: "--color-success-light", text: "--color-success-dark", label: "Completato", className: "stato-completato" },
    [StatoOrdine.Ritardato]: { bg: "--color-danger-light", text: "--color-danger-dark", label: "Ritardato", className: "stato-ritardato" },
    [StatoOrdine.InAttesa]: { bg: "--color-warning-light", text: "--color-warning-dark", label: "In Attesa", className: "stato-in-attesa" },
    [StatoOrdine.Sospeso]: { bg: "--color-neutral-light", text: "--color-neutral-dark", label: "Sospeso", className: "stato-sospeso" },
    [StatoOrdine.Annullato]: { bg: "--color-gray-light", text: "--color-gray-dark", label: "Annullato", className: "stato-annullato" },
    [StatoOrdine.NonDisp]: { bg: "--color-gray-light", text: "--color-gray-dark", label: "Non Disponibile", className: "stato-non-disponibile" },

    [StatoTask.NonInizziato]: { bg: "--color-gray-light", text: "--color-gray-dark", label: "Non Iniziato", className: "stato-non-iniziato" },
    [StatoTask.InEsecuzione]: { bg: "--color-info-light", text: "--color-info-dark", label: "In Esecuzione", className: "stato-in-esecuzione" },
    [StatoTask.Completato]: { bg: "--color-success-light", text: "--color-success-dark", label: "Completato", className: "stato-completato" },
    [StatoTask.Ritardato]: { bg: "--color-danger-light", text: "--color-danger-dark", label: "Ritardato", className: "stato-ritardato" },
    [StatoTask.InSospeso]: { bg: "--color-neutral-light", text: "--color-neutral-dark", label: "Sospeso", className: "stato-sospeso" },
    [StatoTask.Annullato]: { bg: "--color-gray-light", text: "--color-gray-dark", label: "Annullato", className: "stato-annullato" },
}; 

export const statusConfig = {
    [StatoMacchina.Operativa]: { text: "Operativa", color: "--color-success", icon: "CheckCircle" },
    [StatoMacchina.InManutenzione]: { text: "In Manutenzione", color: "--color-warning", icon: "Wrench" },
    [StatoMacchina.FuoriServizio]: { text: "Fuori Servizio", color: "--color-error", icon: "StopCircle" },
    [StatoMacchina.NonAssegnata]: { text: "Non Assegnata", color: "--color-info", icon: "Clock" },
};

export const dashboardColors = {
    [StatoMacchina.Operativa]: {
        light: "var(--color-success-light)",
        dark: "var(--color-success-dark)"
    },
    [StatoMacchina.InManutenzione]: {
        light: "var(--color-warning-light)",
        dark: "var(--color-warning-dark)"
    },
    [StatoMacchina.FuoriServizio]: {
        light: "var(--color-danger-light)",
        dark: "var(--color-danger-dark)"
    },
    [StatoMacchina.NonAssegnata]: {
        light: "var(--color-info-light)",
        dark: "var(--color-info-dark)"
    }
};


export const statusBgColor = (state, prefix = "stato") => {
    return getBackgroundColor(state, prefix);
};

export const statusTextColor = (state, prefix = "stato") => {
    return getTextColor(state, prefix);
};
