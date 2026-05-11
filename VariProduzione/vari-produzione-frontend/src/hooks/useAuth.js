import { createContext, useState, useContext } from 'react'
import axios from 'axios'
import apiEndpoints from '../constants/apiEndpoints'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const [error, setError] = useState(null)

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(apiEndpoints.alert)
            setNotifications(response.data)
            setError(null)
        } catch (error) {
            setError('Failed to fetch notifications')
        }
    }

    return (
        <NotificationContext.Provider value={{ notifications, error, fetchNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext)