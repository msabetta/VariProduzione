import { createContext, useContext, useState, useEffect } from 'react';
import apiEndpoints from '../constants/apiEndpoints';

// Create the context
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Example: Fetch data from an API endpoint
                // const response = await fetch(apiEndpoints.dashboard);
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const jsonData = await response.json();
                
                // Mock data for now
                const mockData = {
                    message: "Welcome to the Data Context!",
                    items: [1, 2, 3, 4, 5],
                    timestamp: new Date().toISOString()
                };
                
                setData(mockData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to manually refresh data
    const refreshData = async () => {
        setLoading(true);
        try {
            // const response = await fetch(apiEndpoints.dashboard);
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            // const jsonData = await response.json();
            
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

// Custom hook to use the DataContext
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export default DataContext;