import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationRail from './NavigationRail';
import '../assets/css/Layout.css';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="layout">
            <NavigationRail />
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;