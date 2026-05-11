import { useState } from "react"
import { useData } from "../hooks/useLocalStorage"
import { getOrdiniRitardo, getOrdiniByDate, getOrdiniCritical, getOrdiniMedium, getOrdiniLow } from "../hooks/useOrdini"
import { getMachine, getMachines } from "../hooks/useMacchine"


export const MachinePage = () => {
    const { data, loading, error } = useData()
    const { ordiniRitardo, ordiniByDate, ordiniCritical, ordiniMedium, ordiniLow } = data
    const [machine, setMachine] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const machine = await getMachine()
            setMachine(machine)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Machine Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Ordini Ritardo: {ordiniRitardo.length}</p>
                    <p>Ordini per Data: {ordiniByDate.length}</p>
                    <p>Ordini Critical: {ordiniCritical.length}</p>
                    <p>Ordini Medium: {ordiniMedium.length}</p>
                    <p>Ordini Low: {ordiniLow.length}</p>
                </div>
            )}
        </div>
    )
}