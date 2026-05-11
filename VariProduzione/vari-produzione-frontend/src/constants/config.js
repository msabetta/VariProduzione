import { apiEndpoints } from "./apiEndpoints"
import { getStatuses, getBaseUrl } from "../services/configurationService"
import { useTheme } from "../Context/ThemeContext"

const config = {
    apiEndpoints,
    statuses: statusesData,
    baseUrl
}

export const theme = useTheme()

export default config

const apiConfig = {
    baseUrl: getBaseUrl(),
    apiEndpoints,
    statuses: statusesData,
    theme: useTheme(),
    defaultStatuses: ["", "In lavorazione", "In attesa di controllo", "Fatto", "In attesa di semilavorato", "Sospeso", "Annullato"],
    saveStatus: (status) => {
        return getStatuses().then((res) => {
            res.push(status)
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
    }
}

export const apiEndpoints = {
    dashboard: apiConfig.baseUrl + "/dashboard",
    ordiniRitardo: apiConfig.baseUrl + "/ordini-ritardo",
    alert: apiConfig.baseUrl + "/alerts",
    alertCritical: apiConfig.baseUrl + "/alerts/critical",
    alertMedium: apiConfig.baseUrl + "/alerts/medium",
    alertLow: apiConfig.baseUrl + "/alerts/low"
}

const statusesData = {
    statuses: ["", "In lavorazione", "In attesa di controllo", "Fatto", "In attesa di semilavorato", "Sospeso", "Annullato"],
    saveStatus: (status) => {
        return getStatuses().then((res) => {
            res.push(status)
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
    }
}
