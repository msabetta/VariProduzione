import { getStatuses } from "../services/configurationService"


const statusesData = {
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
    }
}

export default statusesData
