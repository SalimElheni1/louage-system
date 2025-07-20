import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="text-center py-5">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">
                <span className="text-danger">{t('oops')}</span> {t('page_not_found')}
            </p>
            <p className="lead">{t('page_not_found_desc')}</p>
            <Link to="/" className="btn btn-primary">
                {t('go_home')}
            </Link>
        </div>
    );
}

export default NotFound;
