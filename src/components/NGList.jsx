import React, { useState, useEffect } from "react";
import "../assets/css/NGList.css";

const cameraNames = [
    "대각선 왼쪽 위",  // 1번 카메라
    "대각선 오른쪽 위", // 2번 카메라
    "대각선 왼쪽 아래", // 3번 카메라
    "대각선 오른쪽 아래", // 4번 카메라
    "정면",            // 5번 카메라
];

const NG_TYPES = {
    0: "OK",
    1: "뜯김",
    2: "막힘",
    3: "유로홀버",
    4: "찍힘"
};

const NGList = ({ onItemClick, selectedItem }) => {
    const [data, setData] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState("ALL");

    // 데이터 로드
    useEffect(() => {
        const fetchNGList = async () => {
            try {
                const response = await fetch("http://18.205.110.55:8080/photo/list/ng/all");
                if (response.ok) {
                    const result = await response.json();
                    const transformedData = transformApiResponse(result.photoList);
                    setData(transformedData);
                } else {
                    console.error("Failed to fetch NG list:", response.status, response.statusText);
                }
            } catch (error) {
                console.error("Error fetching NG list:", error);
            }
        };

        fetchNGList();
    }, []);

    // API 응답 데이터 변환
    const transformApiResponse = (photoList) => {
        const groupedData = {};

        photoList.forEach((photo) => {
            if (!groupedData[photo.diecastUuid]) {
                groupedData[photo.diecastUuid] = {
                    id: photo.diecastUuid,
                    objectName: `Object-${photo.diecastUuid}`,
                    date: new Date(photo.createdAt).toLocaleString(),
                    cameras: Array(5).fill(null), // 5개의 카메라 초기화
                };
            }

            groupedData[photo.diecastUuid].cameras[photo.photoPosition - 1] = {
                image: photo.photoUrl,
                cropImage: null, // `photo.photoCroplt`와 `photo.photoCroprb`를 사용해 추출 가능
                type: photo.photoNgtype === 1 ? 0 : 1, // NG 여부
                description: NG_TYPES[photo.photoNgtype] || "null",
            };
        });

        return Object.values(groupedData);
    };

    // 필터링된 데이터
    const filteredData = data
        .map((object) => {
            const ngCamera = object.cameras.find(
                (camera, index) =>
                    camera &&
                    camera.type === 0 &&
                    (selectedCamera === "ALL" || index + 1 === Number(selectedCamera))
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
                        className={`ng-item ${selectedItem && selectedItem.id === item.id ? 'overlay' : ''}`}
                        key={item.id}
                        onClick={() => onItemClick(item)}
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
