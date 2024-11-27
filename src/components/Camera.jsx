import React, { useState } from 'react';
import '../assets/css/Camera.css';

const cameraNames = [
    "대각선 왼쪽 위",  // 1번 카메라
    "대각선 오른쪽 위", // 2번 카메라
    "대각선 왼쪽 아래", // 3번 카메라
    "대각선 오른쪽 아래", // 4번 카메라
    "정면",            // 5번 카메라
];

const Camera = ({ selectedItem, onBackToList }) => {
    if (!selectedItem) return console.log("item 없음");

    return (
        <div className="main-container">
            <div className="camera-container">
                <div>
                    <button className="back-button" onClick={onBackToList}>Back</button>
                    <h2 className="object-name">Object Name: {selectedItem.objectName}</h2>
                </div>

                {selectedItem.cameras.map((camera, index) => {
                    if (!camera) return null;
                    const imageToShow = camera.cropImage || camera.image;

                    return (
                        <div key={index} className="camera-view">
                            <img
                                src={imageToShow}
                                alt={`${cameraNames[index]} NG`}
                                className="camera-image"
                                style={{
                                    border: camera.type === 0 ? "2px solid red" : "none",
                                }}
                            />
                            <p>{cameraNames[index]}</p>
                            <p className="camera-description">
                                {camera.type === 0 ? camera.description : "OK"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Camera;
