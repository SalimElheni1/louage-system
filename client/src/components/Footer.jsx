import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    return (
        <footer className={`py-4 mt-5${isRTL ? ' text-end' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div
                            className={`d-flex align-items-center mb-3${isRTL ? ' flex-row-reverse justify-content-end' : ''}`}
                        >
                            <i className={`fas fa-car text-primary ${isRTL ? 'ms-2' : 'me-2'}`}></i>
                            <span className="fw-bold">Digital Tunisian Louage</span>
                        </div>
                        <p className="text-light mb-0">{t('footer_lead')}</p>
                    </div>
                    <div className="col-md-6">
                        <h6 className="fw-bold mb-3">{t('footer_quicklinks')}</h6>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="text-light text-decoration-none">
                                    {t('footer_about')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-light text-decoration-none">
                                    {t('footer_contact')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-light text-decoration-none">
                                    {t('footer_terms')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-light text-decoration-none">
                                    {t('footer_privacy')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                    <p className="mb-0">© 2025 Digital Tunisian Louage. {t('footer_rights')}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
