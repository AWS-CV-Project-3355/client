import React, { useState } from 'react';
import '../assets/css/Video.css';
import Camera from './Camera';

const Video = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

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
                <Camera
                    selectedItem={selectedItem}
                    onBackToList={() => setSelectedItem(null)}
                />
            ) : (
                <div className='video-container'>
                    {uploadedVideo ? (
                        <video className="video" controls>
                            <source src={uploadedVideo.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="video-placeholder">
                            <p>Upload a video to display it here</p>
                            <input type="file" accept="video/*" onChange={handleVideoUploaded} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Video;