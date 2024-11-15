// import React from "react";
// import '../assets/css/NavigationRail.css';
// import { Link } from 'react-router-dom';
// import logo from '../assets/img/logo.png';
// import { ReactComponent as VideoIcon } from '../assets/icon/Video.svg';
// import { ReactComponent as GraphIcon } from '../assets/icon/Graph.svg';
// import { ReactComponent as MessageIcon } from '../assets/icon/Message.svg';
// import { ReactComponent as SettingIcon } from '../assets/icon/Setting.svg';

// const NavigationRail = () => {
//     return (
//         <nav className="navigation-rail">
//             <img src={logo} />
//             <ul>
//                 <li><Link to="/upload"><VideoIcon />업로드</Link></li>
//                 <li><Link to="/graph"><GraphIcon />그래프</Link></li>
//                 <li><Link to="/help"><MessageIcon />도움말</Link></li>
//                 <li><Link to="/settings"><SettingIcon />환경설정</Link></li>
//             </ul>
//         </nav>
//     );
// };

// export default NavigationRail;

import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { ReactComponent as VideoIcon } from '../assets/icon/Video.svg';
import { ReactComponent as GraphIcon } from '../assets/icon/Graph.svg';
import { ReactComponent as MessageIcon } from '../assets/icon/Message.svg';
import { ReactComponent as SettingIcon } from '../assets/icon/Setting.svg';
import '../assets/css/NavigationRail.css';

const NavigationRail = () => {
    const location = useLocation();

    return (
        <nav className="navigation-rail">
            <img src={logo} alt="Logo" />
            <ul>
                <li>
                    <Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''}>
                        <VideoIcon />
                        <span>업로드</span>
                    </Link>
                </li>
                <li>
                    <Link to="/graph" className={location.pathname === '/graph' ? 'active' : ''}>
                        <GraphIcon />
                        <span>그래프</span>
                    </Link>
                </li>
                <li>
                    <Link to="/help" className={location.pathname === '/help' ? 'active' : ''}>
                        <MessageIcon />
                        <span>도움말</span>
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
                        <SettingIcon />
                        <span>환경설정</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationRail;