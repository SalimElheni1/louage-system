import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="dropdown ms-3">
            <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="langDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {currentLang === 'ar' ? 'العربية' : currentLang === 'fr' ? 'Français' : 'English'}
            </button>
            <ul className="dropdown-menu" aria-labelledby="langDropdown">
                <li>
                    <button className="dropdown-item" onClick={() => changeLanguage('ar')}>
                        العربية
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => changeLanguage('fr')}>
                        Français
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => changeLanguage('en')}>
                        English
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default LanguageSwitcher;
