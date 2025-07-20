import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../features/auth/authSlice';
import toast from '../toast';
import { ThemeContext } from '../context/ThemeContext';

function Header() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                toast.success(t('logout_success'));
                navigate('/');
            })
            .catch((err) => {
                // Assuming the toast utility can handle error objects
                toast.error(err.message || t('logout_failed'));
            });
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.documentElement.lang = lng;
        document.documentElement.dir = i18n.dir(lng);
    };

    const languageNames = {
        en: t('english'),
        fr: t('french'),
        ar: t('arabic')
    };

    return (
        <header className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="fas fa-bus me-2"></i>
                    Digital Louage
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                {t('home')}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/trips">
                                {t('trips')}
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        <li className="nav-item">
                            <button
                                className="btn nav-link px-2"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                <i
                                    className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}
                                ></i>
                            </button>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="languageDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-globe me-1"></i>{' '}
                                {languageNames[i18n.language] || 'Language'}
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="languageDropdown"
                            >
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => changeLanguage('en')}
                                    >
                                        {t('english')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => changeLanguage('fr')}
                                    >
                                        {t('french')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => changeLanguage('ar')}
                                    >
                                        {t('arabic')}
                                    </button>
                                </li>
                            </ul>
                        </li>

                        {isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user-circle me-1"></i>
                                    {user?.username}
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            {t('profile')}
                                        </Link>
                                    </li>
                                    {user?.role === 'driver' && (
                                        <li>
                                            <Link className="dropdown-item" to="/my-trips">
                                                {t('my_declared_trips')}
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt me-2"></i>
                                            {t('logout')}
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-primary" to="/login">
                                        {t('login')}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary" to="/register">
                                        {t('register')}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
