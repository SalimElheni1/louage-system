import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
    const location = useLocation();
    const { t } = useTranslation();

    if (loading) {
        // Show a loading spinner while auth state is being determined
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '80vh' }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{t('loading')}...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login, saving the intended destination to redirect back after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        // User is logged in but doesn't have the required role, redirect to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
