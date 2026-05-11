import { useState } from 'react'
import axios from 'axios'
import apiEndpoints from '../constants/apiEndpoints'

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null)
    const [error, setError] = useState(null)

    const fetchDashboard = async () => {
        try {
            const response = await axios.get(apiEndpoints.dashboard)
            setDashboard(response.data)
            setError(null)
        } catch (error) {
            setError('Failed to fetch dashboard')
        }
    }

    return (
        <DashboardContext.Provider value={{ dashboard, error, fetchDashboard }}>
            {children}
        </DashboardContext.Provider>
    )
}

export default Dashboard