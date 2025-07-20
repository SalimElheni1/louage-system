import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearRegistration } from '../features/auth/authSlice';
import toast from '../toast';

function Register() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (auth.isAuthenticated && auth.user) {
            toast.success(`${t('welcome_new_user')}, ${auth.user.firstName}!`);
            // Clear registration-specific state before navigating
            dispatch(clearRegistration());
            navigate('/');
        }
        // Clear any previous registration errors when the component mounts
        return () => {
            dispatch(clearRegistration());
        };
    }, [auth.isAuthenticated, auth.user, dispatch, navigate, t]);

    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    const selectedRole = watch('role');

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
                    className="register-container card p-4 shadow-lg border-0"
                    style={{
                        background: 'var(--bs-card-bg, var(--bs-body-bg, #fff))',
                        borderRadius: '1rem',
                        maxWidth: 600,
                        width: '100%'
                    }}
                >
                    <div className="text-center mb-4">
                        <i className="fas fa-car brand-icon"></i>
                        <h2 className="fw-bold text-primary mb-2">{t('create_account')}</h2>
                        <p className="text-muted">{t('register_subtitle')}</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {auth.error && <div className="alert alert-danger">{auth.error}</div>}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName" className="form-label">
                                    {t('first_name')}
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    id="firstName"
                                    {...register('firstName', {
                                        required: t('first_name_required')
                                    })}
                                    placeholder={t('first_name_placeholder')}
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">
                                        {errors.firstName.message}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName" className="form-label">
                                    {t('last_name')}
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    id="lastName"
                                    {...register('lastName', { required: t('last_name_required') })}
                                    placeholder={t('last_name_placeholder')}
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">
                                        {errors.lastName.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="username" className="form-label">
                                    {t('username')}
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    id="username"
                                    {...register('username', { required: t('username_required') })}
                                    placeholder={t('username_placeholder')}
                                />
                                {errors.username && (
                                    <div className="invalid-feedback">
                                        {errors.username.message}
                                    </div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label">
                                    {t('email')}
                                </label>
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
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="form-label">
                                    {t('password')}
                                </label>
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
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone" className="form-label">
                                    {t('phone')}
                                </label>
                                <input
                                    type="tel"
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    id="phone"
                                    {...register('phone', { required: t('phone_required') })}
                                    placeholder="+216 XX XXX XXX"
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">{errors.phone.message}</div>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">
                                {t('account_type')}
                            </label>
                            <select
                                className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                id="role"
                                {...register('role', { required: t('role_required') })}
                            >
                                <option value="">{t('select_account_type')}</option>
                                <option value="passenger">{t('passenger')}</option>
                                <option value="driver">{t('driver')}</option>
                            </select>
                            {errors.role && (
                                <div className="invalid-feedback">{errors.role.message}</div>
                            )}
                        </div>
                        {selectedRole === 'driver' && (
                            <div className="driver-fields" id="driverFields">
                                <div className="alert alert-info">
                                    <i className="fas fa-info-circle me-2"></i>
                                    {t('driver_info_note')}
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="vehicleType" className="form-label">
                                            {t('vehicle_type')}
                                        </label>
                                        <select
                                            className="form-select"
                                            id="vehicleType"
                                            {...register('vehicleType', {
                                                required: t('vehicle_type_required')
                                            })}
                                        >
                                            <option value="">{t('select_vehicle_type')}</option>
                                            <option value="sedan">{t('sedan')}</option>
                                            <option value="suv">{t('suv')}</option>
                                            <option value="minibus">{t('minibus')}</option>
                                            <option value="van">{t('van')}</option>
                                        </select>
                                        {errors.vehicleType && (
                                            <div className="invalid-feedback">
                                                {errors.vehicleType.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="licensePlate" className="form-label">
                                            {t('license_plate')}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.licensePlate ? 'is-invalid' : ''}`}
                                            id="licensePlate"
                                            {...register('licensePlate', {
                                                required: t('license_plate_required')
                                            })}
                                            placeholder="123 TUN 456"
                                        />
                                        {errors.licensePlate && (
                                            <div className="invalid-feedback">
                                                {errors.licensePlate.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="licenseNumber" className="form-label">
                                            {t('license_number')}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.licenseNumber ? 'is-invalid' : ''}`}
                                            id="licenseNumber"
                                            {...register('licenseNumber', {
                                                required: t('license_number_required')
                                            })}
                                            placeholder={t('license_number_placeholder')}
                                        />
                                        {errors.licenseNumber && (
                                            <div className="invalid-feedback">
                                                {errors.licenseNumber.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="experience" className="form-label">
                                            {t('experience')}
                                        </label>
                                        <select
                                            className="form-select"
                                            id="experience"
                                            {...register('experience', {
                                                required: t('experience_required')
                                            })}
                                        >
                                            <option value="">{t('select_experience')}</option>
                                            <option value="1-2">1-2 {t('years')}</option>
                                            <option value="3-5">3-5 {t('years')}</option>
                                            <option value="5-10">5-10 {t('years')}</option>
                                            <option value="10+">10+ {t('years')}</option>
                                        </select>
                                        {errors.experience && (
                                            <div className="invalid-feedback">
                                                {errors.experience.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                {...register('terms', { required: t('terms_required') })}
                            />
                            <label className="form-check-label" htmlFor="terms">
                                {t('agree_terms')}{' '}
                                <Link to="#" className="text-primary">
                                    {t('terms_of_service')}
                                </Link>{' '}
                                {t('and')}{' '}
                                <Link to="#" className="text-primary">
                                    {t('privacy_policy')}
                                </Link>
                            </label>
                            {errors.terms && (
                                <div className="invalid-feedback d-block">
                                    {errors.terms.message}
                                </div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                            <i className="fas fa-user-plus me-2"></i>
                            {t('create_account')}
                        </button>
                        <div className="text-center">
                            <p className="text-muted">
                                {t('already_have_account')}{' '}
                                <Link
                                    to="/login"
                                    className="text-primary text-decoration-none fw-medium"
                                >
                                    {t('login_here')}
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

export default Register;
