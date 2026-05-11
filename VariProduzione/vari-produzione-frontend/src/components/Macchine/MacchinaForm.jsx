import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import Logo from '../Common/Logo';
import './Macchine.css';

const MacchinaForm = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="macchina-form">
            <div className="macchina-form-content">
                <Logo className="logo-macchina-form" />
                <div className="macchina-form-actions">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'standard' ? 'Industrial ⚙️' : 'Standard 🎨'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MacchinaForm;