import React from 'react';
import '../assets/css/Detect.css';

const Detect = ({ src }) => {
    return (
        <div className="detect">
            <video className="detect-video" controls>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export { Detect };
