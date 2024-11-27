import React, { useState, useEffect } from 'react';
import '../assets/css/Camera.css';

const cameraNames = [
    "대각선 왼쪽 위",  // 1번 카메라
    "대각선 오른쪽 위", // 2번 카메라
    "대각선 왼쪽 아래", // 3번 카메라
    "대각선 오른쪽 아래", // 4번 카메라
    "정면",            // 5번 카메라
];

const fakeImageUrl = "https://via.placeholder.com/150";  // 가짜 사진 URL (플레이스홀더 이미지)

const Camera = ({ selectedItem, onBackToList }) => {
    const [photoList, setPhotoList] = useState([]);

    // selectedItem이 존재하고, diecastUuid가 있을 때만 API 호출
    useEffect(() => {
        if (selectedItem && selectedItem.diecastUuid) {
            const fetchPhotos = async () => {
                try {
                    const response = await fetch(`http://18.205.110.55:8080/diecast/${selectedItem.diecastUuid}/photo/list`);
                    const data = await response.json();
                    setPhotoList(data.photoList);  // API에서 받아온 사진 리스트를 상태에 저장
                } catch (error) {
                    console.error("사진 목록 불러오기 실패:", error);
                }
            };

            fetchPhotos();
        }
    }, [selectedItem]);  // selectedItem이 변경될 때마다 API 호출

    if (!selectedItem) return console.log("item 없음");

    // 각 카메라에 대한 사진을 찾거나, 없을 경우 가짜 사진을 사용
    const getCameraPhoto = (cameraIndex) => {
        const photo = photoList.find((item) => item.photoPosition === cameraIndex);
        return photo ? photo.photoUrl : fakeImageUrl; // photoUrl이 없으면 가짜 이미지 사용
    };

    return (
        <div className="main-container">
            <div className="camera-container">
                <div>
                    <button className="back-button" onClick={onBackToList}>Back</button>
                    <h2 className="object-name">Object Name: {selectedItem.objectName}</h2>
                </div>

                {/* 각 카메라 화면에 대해 사진을 표시 */}
                {cameraNames.map((cameraName, index) => {
                    const imageToShow = getCameraPhoto(index + 1);  // 각 카메라에 맞는 사진 가져오기

                    return (
                        <div key={index} className="camera-view">
                            <img
                                src={imageToShow}
                                alt={`${cameraName}`}
                                className="camera-image"
                                style={{
                                    border: photoList[index]?.photoNgtype === 0 ? "2px solid red" : "none", // 불량 사진에 빨간 테두리
                                }}
                            />
                            <p>{cameraName}</p>
                            <p className="camera-description">
                                {photoList[index]?.photoNgtype === 0 ? "NG" : "OK"} {/* 불량 또는 정상 상태 표시 */}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Camera;
