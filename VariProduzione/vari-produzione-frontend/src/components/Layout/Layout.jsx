import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import Logo from '../Common/Logo';

const Layout = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`app-container theme-${theme}`}>
            {children}
        </div>
    );
};