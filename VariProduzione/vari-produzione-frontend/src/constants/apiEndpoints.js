import { getBaseUrl } from "../services/configurationService"
import { useTheme } from "../Context/ThemeContext";


export const apiEndpoints = {
    dashboard: getBaseUrl() + "/dashboard",
    ordiniRitardo: getBaseUrl() + "/ordini-ritardo",
    alert: getBaseUrl() + "/alerts",
    alertCritical: getBaseUrl() + "/alerts/critical",
    alertMedium: getBaseUrl() + "/alerts/medium",
    alertLow: getBaseUrl() + "/alerts/low",
    saveStatus: (status) => {
        return getStatuses().then((res) => {
            res.push(status)
            return res
        })
    },
    updateStatus: (status) => {
        return getStatuses().then((res) => {
            res.map((s) => {
                if (s.id === status.id) {
                    s.nome = status.nome
                    s.colore = status.colore
                }
                return s
            })
            return res
        })
    },
    removeStatus: (status) => {
        return getStatuses().then((res) => {
            res.splice(res.indexOf(status), 1)
            return res
        })
    },
    getStatuses: () => {
        return getStatuses()
    },
    theme: useTheme()
}

export default apiEndpoints