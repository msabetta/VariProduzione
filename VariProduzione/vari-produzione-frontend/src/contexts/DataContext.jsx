import { createContext, useState, useContext } from 'react'
import axios from 'axios'
import apiEndpoints from '../constants/apiEndpoints'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${apiEndpoints.baseUrl}/login`, { username, password })
            setUser(response.data)
            setError(null)
        } catch (error) {
            setError('Invalid credentials')
        }
    }

    const logout = () => {
        setUser(null)
        setError(null)
    }

    return (
        <AuthContext.Provider value={{ user, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)