import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import {  useSelector } from 'react-redux';
import { isUserLoggedIn } from '../redux/slices/authSlice'

const ProtectedRoute = ({ redirectTo = '/' }) => {
    const isLoggedIn = useSelector(isUserLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />
};

export default ProtectedRoute;
