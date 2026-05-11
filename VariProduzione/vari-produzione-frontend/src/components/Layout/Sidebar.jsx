import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Sidebar = () => {
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

export default Sidebar;