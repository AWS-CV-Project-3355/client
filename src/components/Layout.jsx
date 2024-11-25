import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationRail from './NavigationRail';
import '../assets/css/Layout.css';
import Video from './Video';
import Camera from './Camera';
import NGList from './NGList';

const Layout = ({ selectedItem, onItemClick, onBackToList }) => {

    return (
        <div className="layout">
            <NavigationRail />
            <div className="navigator-container">
                <Outlet />
            </div>
            <div className='main-container'>
                {selectedItem ? (
                    <Camera
                        selectedItem={selectedItem}
                        onBackToList={onBackToList}
                    />
                ) : (
                    <Video />
                )}
                <div className="ng-list-container">
                    <NGList onItemClick={onItemClick} selectedItem={selectedItem} />
                </div>
            </div>
        </div>
    );
};

export default Layout;
