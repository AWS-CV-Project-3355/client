import React, { useState, useEffect } from 'react';
import '../assets/css/Video.css';
import Camera from './Camera';

const Video = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState(""); // 서버에서 받은 URL
    const [frames, setFrames] = useState([]); // 비디오 프레임 상태

    useEffect(() => {
        const savedVideo = localStorage.getItem('uploadedVideo');

        if (savedVideo) {
            const parsedVideo = JSON.parse(savedVideo);
            setUploadedVideo(parsedVideo);
        }
    }, []);

    // 비디오 업로드 처리
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

                    // 서버에서 받은 URL 저장
                    setUploadedVideoUrl(result.diecastvideoUrl);

                    // videoId를 이용해 프레임 요청
                    const videoId = 1; // 서버에서 받은 videoId
                    fetchFrames(videoId); // 프레임 데이터 요청
                } else {
                    console.error('Failed to upload video:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error uploading video:', error);
            }
        }
    };

    // 비디오 프레임 요청
    const fetchFrames = async (videoId) => {
        try {
            const response = await fetch(`http://18.205.110.55:8080/video/frames?videoId=${videoId}`);

            if (response.ok) {
                const result = await response.json();
                console.log('Frames fetched successfully:', result);
                setFrames(result.frames); // 프레임 데이터를 상태에 저장
            } else {
                console.error('Failed to fetch frames:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching frames:', error);
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
                <div className="video-container">
                    {/* 비디오 표시 */}
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

                    {/* 업로드된 URL 표시 */}
                    {/* {uploadedVideoUrl && (
                        <div className="video-url">
                            <p>Uploaded Video URL:</p>
                            <a href={uploadedVideoUrl} target="_blank" rel="noopener noreferrer">
                                {uploadedVideoUrl}
                            </a>
                        </div>
                    )} */}

                    {/* 프레임 표시
                    <div className="frames-container">
                        {frames.length > 0 ? (
                            frames.map((frame, index) => (
                                <div key={index} className="frame-item">
                                    <img src={frame.imageUrl} alt={`Frame ${index}`} className="frame-image" />
                                </div>
                            ))
                        ) : (
                            <p>No frames available</p>
                        )}
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default Video;
