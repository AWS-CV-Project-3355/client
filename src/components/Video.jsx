import React, { useState, useEffect } from 'react';
import '../assets/css/Video.css';
import Camera from './Camera';

const Video = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const savedVideo = localStorage.getItem('uploadedVideo');

        if (savedVideo) {
            const parsedVideo = JSON.parse(savedVideo);
            setUploadedVideo(parsedVideo);
        }
    }, []);

    const handleVideoUploaded = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const videoData = {
                src: URL.createObjectURL(file),
                name: file.name,
            };
            setUploadedVideo(videoData);

            localStorage.setItem('uploadedVideo', JSON.stringify(videoData));

            const formData = new FormData();
            formData.append('diecastvideo', file);

            try {
                const response = await fetch('http://18.205.110.55:8080/video', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Video uploaded successfully:', result);
                } else {
                    console.error('Failed to upload video:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error uploading video:', error);
            }
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
                        <video autoPlay muted loop className="video" controls>
                            <source src={uploadedVideo.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="video-placeholder">
                            <p>Upload video</p>
                            <input type="file" accept="video/*" onChange={handleVideoUploaded} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Video;
