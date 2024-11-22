import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationRail from './NavigationRail';
import '../assets/css/Layout.css';
import Main from './Main';
import NGList from './NGList';

const Layout = () => {
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    const handleBackToList = () => {
        setSelectedItem(null);
    };

    return (
        <div className="layout">
            <NavigationRail />
            <div className="navigator-container">
                <Outlet />
            </div>
            <div className='main-container'>
                <Main selectedItem={selectedItem} onBackToList={handleBackToList} />
                <div className="ng-list-container">
                    <NGList onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
};

export default Layout;