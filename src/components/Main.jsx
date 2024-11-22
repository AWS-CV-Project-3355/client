import React, { useState } from 'react';
import { Detect } from './Detect';
import '../assets/css/Main.css';
import NGDetail from './NGDetail';
import test_img from '../assets/img/test_img.png';

const Main = ({ selectedItem, onBackToList }) => {
    const [uploadedVideo, setUploadedVideo] = useState(null);

    const handleVideoUploaded = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedVideo({
                src: URL.createObjectURL(file),
                name: file.name,
            });
        }
    };

    return (
        <div className="main-container">
            {selectedItem ? (
                <NGDetail item={selectedItem} onBack={onBackToList} />
            ) : (
                <div className='detect-container'>
                    {uploadedVideo ? (
                        <Detect src={uploadedVideo.src} />
                    ) : (
                        <div className="video-placeholder">
                            <p>Upload a video to display it here</p>
                            <input type="file" accept="video/*" onChange={handleVideoUploaded} />
                        </div>
                    )}
                    <img src={test_img} alt='' className='left-up' />
                    <img src={test_img} alt='' className='left-down' />
                    <img src={test_img} alt='' className='right-up' />
                    <img src={test_img} alt='' className='right-down' />
                    <img src={test_img} alt='' className='frontal' />
                </div>
            )}
        </div>
    );
};

export default Main;