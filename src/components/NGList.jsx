import React, { useState } from "react";
import '../assets/css/NGList.css';
import testImg from '../assets/img/test_img.png';
import Camera from './Camera';

const cameraNames = [
    "대각선 왼쪽 위",  // 1번 카메라
    "대각선 오른쪽 위", // 2번 카메라
    "대각선 왼쪽 아래", // 3번 카메라
    "대각선 오른쪽 아래", // 4번 카메라
    "정면",            // 5번 카메라
];

// NGList 컴포넌트
const NGList = ({ onItemClick }) => {
    const data = [
        {
            id: 1,
            objectName: "20231013-20244012",
            date: "2023-10-13 20:24:12",
            cameras: [
                { image: testImg, cropImage: testImg, type: 0, description: "1뜯김" },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
            ],
        },
        {
            id: 2,
            objectName: "20231014-12345678",
            date: "2023-10-14 12:34:56",
            cameras: [
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: testImg, type: 0, description: "2오염" },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
            ],
        },
        {
            id: 3,
            objectName: "20231014-12345678",
            date: "2023-10-14 12:34:56",
            cameras: [
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: testImg, type: 0, description: "3오염" },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
            ],
        },
    ];

    const [selectedCamera, setSelectedCamera] = useState("ALL");

    // 필터링된 데이터
    const filteredData = data
        .map((object) => {
            const ngCamera = object.cameras.find(
                (camera, index) =>
                    camera.type === 0 && (selectedCamera === "ALL" || index + 1 === Number(selectedCamera))
            );
            return ngCamera
                ? { ...object, representativeNG: ngCamera, cameraIndex: object.cameras.indexOf(ngCamera) }
                : null;
        })
        .filter((item) => item !== null);

    return (
        <div className="ng-list-container">
            {/* 필터 버튼 */}
            <div className="filter-buttons">
                {["ALL", "1", "2", "3", "4", "5"].map((cameraNumber) => (
                    <button
                        key={cameraNumber}
                        className={`filter-button ${selectedCamera === cameraNumber ? "active" : ""}`}
                        onClick={() => setSelectedCamera(cameraNumber)}
                    >
                        {cameraNumber}
                    </button>
                ))}
            </div>

            {/* NG 리스트 */}
            <div className="ng-list">
                {filteredData.map((item) => (
                    <div
                        className="ng-item"
                        key={item.id}
                        onClick={() => onItemClick(item)}  // Call onItemClick to pass selected item to parent
                    >
                        <img
                            src={item.representativeNG.cropImage || item.representativeNG.image}
                            className="ng-image"
                            alt={`${item.objectName} NG`}
                        />
                        <span className="ng-description">{item.representativeNG.description}</span>
                        <span className="ng-camera">
                            {cameraNames[item.cameraIndex]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NGList;
