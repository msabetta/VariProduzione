import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import Logo from '../Common/Logo';

const Footer = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <footer className="footer">
            <div className="footer-content">
                <Logo className="logo-footer" />
                <p className="footer-text">© 2026 VariProduzione. All rights reserved.</p>
            </div>
        </footer>
    );
};