import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import toast from '../toast';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated && auth.user) {
            toast.success(`${t('welcome_back')}, ${auth.user.firstName || ''}!`, {
                autoClose: 2000
            });
            setTimeout(() => navigate('/'), 2000);
        }
    }, [auth.isAuthenticated, auth.user, t, navigate]);

    const onSubmit = (data) => {
        dispatch(login(data));
    };

    return (
        <>
            <div
                className="login-gradient-bg position-fixed top-0 start-0 w-100 h-100"
                style={{ zIndex: -1 }}
            ></div>
            <div
                className="container d-flex align-items-center justify-content-center"
                style={{ minHeight: '100vh', position: 'relative' }}
            >
                <div
                    className="login-container card p-4 shadow-lg border-0"
                    style={{
                        background: 'var(--bs-card-bg, var(--bs-body-bg, #fff))',
                        borderRadius: '1rem',
                        maxWidth: 400,
                        width: '100%'
                    }}
                >
                    <div className="text-center mb-4">
                        <i
                            className="fas fa-car brand-icon"
                            style={{
                                color: 'var(--primary-color)',
                                fontSize: '3rem',
                                marginBottom: '1rem'
                            }}
                        ></i>
                        <h2 className="fw-bold text-primary mb-2">{t('welcome_back')}</h2>
                        <p className="text-muted">{t('login_subtitle')}</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                {t('email')}
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    {...register('email', { required: t('email_required') })}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email.message}</div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                {t('password')}
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    {...register('password', { required: t('password_required') })}
                                    placeholder={t('password_placeholder')}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label className="form-check-label" htmlFor="remember">{t('remember_me')}</label>
                        </div> */}
                        {auth.error && <div className="alert alert-danger">{auth.error}</div>}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 mb-3"
                            disabled={auth.loading}
                        >
                            {auth.loading ? t('loading') : t('login')}
                        </button>
                        <div className="text-center">
                            <p className="text-muted">
                                {t('no_account')}{' '}
                                <Link
                                    to="/register"
                                    className="text-primary text-decoration-none fw-medium"
                                >
                                    {t('register_here')}
                                </Link>
                            </p>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <Link to="/" className="text-primary text-decoration-none">
                            <i className="fas fa-arrow-left me-2"></i>
                            {t('back_to_home')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
