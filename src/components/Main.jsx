import React, { useState } from 'react';
import Detect from './Detect';
import NGList from './NGList';
import '../assets/css/Main.css';

const Main = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);

    const handleVideoUploaded = (video) => {
        setUploadedVideo(video);
    };

    return (
        <div className="main-container">
            {uploadedVideo ? (
                <Detect src={uploadedVideo.src} />
            ) : (
                <div className="video-placeholder">
                    <p>Upload a video to display it here</p>
                </div>
            )}

            <div className="ng-list-container">
                <NGList />
            </div>
        </div>
    );
};

export default Main;