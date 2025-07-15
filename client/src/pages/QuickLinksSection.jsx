import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function QuickLinksSection() {
    const { t } = useTranslation();
    return (
        <section className="py-5">
            <div className="container">
                <div className="row text-center">
                    <div className="col-12 mb-4">
                        <h3>{t('quicklinks_title')}</h3>
                    </div>
                </div>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <i
                                    className="fas fa-user-friends text-primary mb-3"
                                    style={{ fontSize: '2rem' }}
                                ></i>
                                <h5 className="card-title">{t('quicklinks_passenger_title')}</h5>
                                <p className="card-text">{t('quicklinks_passenger_desc')}</p>
                                <Link to="/trips" className="btn btn-primary">
                                    {t('quicklinks_find_trips')}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <i
                                    className="fas fa-car text-primary mb-3"
                                    style={{ fontSize: '2rem' }}
                                ></i>
                                <h5 className="card-title">{t('quicklinks_driver_title')}</h5>
                                <p className="card-text">{t('quicklinks_driver_desc')}</p>
                                <Link to="/register" className="btn btn-primary">
                                    {t('quicklinks_become_driver')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuickLinksSection;
