import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { ReactComponent as VideoIcon } from '../assets/icon/Video.svg';
import { ReactComponent as GraphIcon } from '../assets/icon/Graph.svg';
import '../assets/css/NavigationRail.css';
import GraphNgOk from './GraphNgOk';
import GraphNgType from './GraphNgType';

const NavigationRail = () => {
    const location = useLocation();

    return (
        <nav className="navigation-rail">
            <img src={logo} alt="Logo" />
            <ul>
                <li>
                    <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>
                        <VideoIcon />
                        <span>기록</span>
                    </Link>
                </li>
                <li>
                    <Link to="/graph" className={location.pathname === '/graph' ? 'active' : ''}>
                        <GraphIcon />
                        <span>그래프</span>
                    </Link>
                </li>
                <div className="graph-container">
                    <div className="graph-ok">
                        <GraphNgOk />
                    </div>
                    <div className="graph-type">
                        <GraphNgType />
                    </div>
                </div>
            </ul>
        </nav>
    );
};

export default NavigationRail;