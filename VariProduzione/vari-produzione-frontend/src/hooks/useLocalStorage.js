import { createContext, useContext, useState, useEffect } from 'react';
import apiEndpoints from '../constants/apiEndpoints';

const DataContext = createContext();
const baseUrl = apiEndpoints.baseUrl;

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [storico, setStorico] = useState(null);
    const [alert, setAlert] = useState([]);
    const [alertCritical, setAlertCritical] = useState([]);
    const [alertMedium, setAlertMedium] = useState([]);
    const [alertLow, setAlertLow] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/storico`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                const mockData = {
                    message: "Welcome to the Data Context!",
                    items: [1, 2, 3, 4, 5],
                    timestamp: new Date().toISOString(),
                    storico: jsonData.storico,
                    ultimiAlert: jsonData.ultimiAlert
                };

                setData(mockData);
                setStorico(jsonData.storico);
                setUltimiAlert(jsonData.ultimiAlert);
            } catch (err) {
                setError(err);
                setStorico(null);
                setUltimiAlert(null);
            } finally {
                setLoading(false);
                setStorico(null);
                setUltimiAlert(null);
            }
        };

        fetchData();
        console.log("Data loaded", data);
    }, []);

    const refreshData = async () => {
        setLoading(true);
        setStorico(null);
        setUltimiAlert(null);

        try {
            
            const mockData = {
                message: "Data refreshed successfully!",
                items: [10, 20, 30, 40, 50],
                timestamp: new Date().toISOString()
            };

            setData(mockData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DataContext.Provider value={{ data, loading, error, refreshData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    console.log("Data from context", context);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export default DataContext;
