import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import Logo from '../Common/Logo';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="header">
            <div className="header-content">
                <Logo className="logo-header" />
                <div className="header-actions">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'standard' ? 'Industrial ⚙️' : 'Standard 🎨'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;