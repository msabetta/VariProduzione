import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import Logo from '../Common/Logo';
import './Macchine.css';

const MacchinaDetail = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`app-container theme-${theme}`}>
            {children}
        </div>
    );
};

export default MacchinaDetail;