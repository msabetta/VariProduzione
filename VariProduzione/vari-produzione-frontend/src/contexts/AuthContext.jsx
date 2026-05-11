import { getBaseUrl } from "../services/configurationService"

export const getStatuses = () => {
    return fetch(`${getBaseUrl()}/statuses`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
}