import React from 'react';
import { useTranslation } from 'react-i18next';

function FeaturesSection() {
    const { t } = useTranslation();
    return (
        <section className="py-5">
            <div className="container">
                <div className="row text-center mb-5">
                    <div className="col-12">
                        <h2 className="fw-bold">{t('features_title')}</h2>
                        <p className="text-muted">{t('features_subtitle')}</p>
                    </div>
                </div>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4">
                            <i className="fas fa-clock feature-icon"></i>
                            <h5>{t('feature_realtime_title')}</h5>
                            <p className="text-muted">{t('feature_realtime_desc')}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4">
                            <i className="fas fa-shield-alt feature-icon"></i>
                            <h5>{t('feature_safe_title')}</h5>
                            <p className="text-muted">{t('feature_safe_desc')}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4">
                            <i className="fas fa-money-bill-wave feature-icon"></i>
                            <h5>{t('feature_affordable_title')}</h5>
                            <p className="text-muted">{t('feature_affordable_desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
