import React, { useState } from 'react';
import Detect from './Detect';
import NGList from './NGList';
import '../assets/css/Main.css';
import NGDetail from './NGDetail';

const Main = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleVideoUploaded = (video) => {
        setUploadedVideo(video);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleBackToList = () => {
        setSelectedItem(null);
    };

    return (
        <div className="main-container">
            {selectedItem ? (
                <NGDetail item={selectedItem} onBack={handleBackToList} />
            ) : (
                <>
                    {uploadedVideo ? (
                        <Detect src={uploadedVideo.src} />
                    ) : (
                        <div className="video-placeholder">
                            <p>Upload a video to display it here</p>
                        </div>
                    )}
                </>
            )}


            <div className="ng-list-container">
                <NGList onItemClick={handleItemClick} />
            </div>
        </div>
    );
};

export default Main;