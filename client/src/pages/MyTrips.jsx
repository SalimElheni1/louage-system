import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMyTrips, deleteTrip } from '../features/trips/tripsSlice';
import toast from '../toast';

function MyTrips() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { trips, loading, error } = useSelector((state) => state.trips);

    useEffect(() => {
        // Fetch the driver's trips when the component mounts
        dispatch(getMyTrips());
    }, [dispatch]);

    const handleDelete = (tripId) => {
        if (window.confirm(t('confirm_delete_trip'))) {
            dispatch(deleteTrip(tripId))
                .unwrap()
                .then(() => {
                    toast.success(t('trip_deleted_successfully'));
                })
                .catch((err) => {
                    toast.error(err || t('trip_delete_failed'));
                });
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'active':
                return 'bg-success';
            case 'completed':
                return 'bg-secondary';
            case 'cancelled':
                return 'bg-danger';
            default:
                return 'bg-dark';
        }
    };

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '50vh' }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{t('loading')}...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">{t('my_declared_trips')}</h2>
                <Link to="/declare-trip" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i> {t('declare_new_trip')}
                </Link>
            </div>

            {trips.length === 0 ? (
                <div className="text-center p-5 border rounded bg-body-tertiary">
                    <p className="lead">{t('no_trips_declared')}</p>
                    <p>{t('no_trips_declared_desc')}</p>
                    <Link to="/declare-trip" className="btn btn-success mt-3">
                        {t('declare_first_trip')}
                    </Link>
                </div>
            ) : (
                <div className="row">
                    {trips.map((trip) => (
                        <div key={trip._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm trip-card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 card-title">
                                        {trip.departureStation} &rarr; {trip.arrivalStation}
                                    </h5>
                                    <span className={`badge ${getStatusBadgeClass(trip.status)}`}>
                                        {t(trip.status)}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        <i className="fas fa-calendar-alt me-2 text-muted"></i>
                                        <strong>{t('departure')}:</strong>{' '}
                                        {formatDate(trip.departureTime)}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-chair me-2 text-muted"></i>
                                        <strong>{t('seats')}:</strong> {trip.availableSeats}
                                    </p>
                                    <p className="card-text">
                                        <i className="fas fa-tag me-2 text-muted"></i>
                                        <strong>{t('price')}:</strong> {trip.price} {t('tnd')}
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent d-flex justify-content-end border-top-0 pt-0">
                                    <button
                                        className="btn btn-outline-secondary btn-sm me-2"
                                        disabled
                                    >
                                        <i className="fas fa-edit me-1"></i> {t('edit')}
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDelete(trip._id)}
                                        disabled={loading}
                                    >
                                        <i className="fas fa-trash me-1"></i> {t('delete')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyTrips;
