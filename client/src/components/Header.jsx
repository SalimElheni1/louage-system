import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Header() {
    const [theme, setTheme] = useState('light');
    const { t } = useTranslation();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <nav
            className={`navbar navbar-expand-lg shadow-sm ${theme === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'}`}
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="fas fa-car me-2"></i>
                    Digital Tunisian Louage
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/trips">
                                {t('trips')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                {t('login')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                {t('register')}
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="btn btn-outline-secondary ms-3"
                        onClick={toggleTheme}
                        aria-label="Toggle dark/light mode"
                    >
                        {theme === 'light' ? (
                            <i className="fas fa-moon"></i>
                        ) : (
                            <i className="fas fa-sun"></i>
                        )}
                    </button>
                    {/* Language Switcher */}
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
}

export default Header;
