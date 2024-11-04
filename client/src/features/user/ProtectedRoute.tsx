import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    if (!loggedIn) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
