import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FeaturesSection from '../components/home/FeaturesSection';
import QuickLinksSection from '../components/home/QuickLinksSection';

function Home() {
    const { t } = useTranslation();
    return (
        <>
            <div
                className="login-gradient-bg position-fixed top-0 start-0 w-100 h-100"
                style={{ zIndex: -1 }}
            ></div>
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <section className="hero-section text-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="display-4 fw-bold mb-4">{t('welcome')}</h1>
                                <p className="lead mb-5">{t('home_lead')}</p>
                                <div className="d-flex gap-3 justify-content-center flex-wrap">
                                    <Link to="/trips" className="btn btn-light btn-lg">
                                        <i className="fas fa-search me-2"></i>
                                        {t('trips')}
                                    </Link>
                                    <Link to="/register" className="btn btn-primary btn-lg">
                                        <i className="fas fa-user-plus me-2"></i>
                                        {t('register')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FeaturesSection />
                <QuickLinksSection />
            </div>
        </>
    );
}

export default Home;
