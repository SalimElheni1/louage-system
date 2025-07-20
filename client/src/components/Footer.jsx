import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-4 mt-5 bg-body-tertiary text-body-secondary border-top">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center mb-3">
                            <i className="fas fa-bus text-primary me-2"></i>
                            <span className="fw-bold fs-5">{t('brand_name')}</span>
                        </div>
                        <p className="mb-0">{t('footer_lead')}</p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold mb-3">{t('footer_quicklinks')}</h6>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/about" className="text-reset text-decoration-none">
                                    {t('footer_about')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-reset text-decoration-none">
                                    {t('footer_contact')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-reset text-decoration-none">
                                    {t('footer_terms')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-reset text-decoration-none">
                                    {t('footer_privacy')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h6 className="fw-bold mb-3">{t('footer_follow_us')}</h6>
                        <div className="d-flex">
                            <a href="#" className="text-reset me-3" aria-label="Facebook">
                                <i className="fab fa-facebook-f fa-lg"></i>
                            </a>
                            <a href="#" className="text-reset me-3" aria-label="Twitter">
                                <i className="fab fa-twitter fa-lg"></i>
                            </a>
                            <a href="#" className="text-reset me-3" aria-label="Instagram">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                            <a href="#" className="text-reset" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in fa-lg"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                    <p className="mb-0">
                        © {currentYear} {t('brand_name')}. {t('footer_rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
