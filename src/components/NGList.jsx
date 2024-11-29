import React, { useState, useEffect } from "react";
import "../assets/css/NGList.css";

const cameraNames = ["1번 카메라", "2번 카메라", "3번 카메라", "4번 카메라", "5번 카메라"];

// Corrected NG_TYPES object
const NG_TYPES = {
    0: "뜯김",  // Changed to represent "torn"
    1: "OK",   // Changed to represent "OK"
};

const NGList = ({ onItemClick, selectedItem }) => {
    const [data, setData] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState("ALL");
    const [loading, setLoading] = useState(false);

    // API 호출 함수
    const fetchNGList = async (camera) => {
        setLoading(true); // 로딩 시작
        try {
            const endpoint =
                camera === "ALL"
                    ? "http://18.205.110.55:8080/photo/list/ng/all"
                    : `http://18.205.110.55:8080/photo/list/ng/${camera}`;
            const response = await fetch(endpoint);

            if (response.ok) {
                const result = await response.json();
                const transformedData = transformApiResponse(result.photoList);
                setData(transformedData);
            } else {
                console.error("Failed to fetch NG list:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error fetching NG list:", error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const transformApiResponse = (photoList) => {
        const groupedData = {};

        photoList.forEach((photo) => {
            if (!groupedData[photo.diecastUuid]) {
                groupedData[photo.diecastUuid] = {
                    id: photo.diecastUuid,
                    objectName: `Object-${photo.diecastUuid}`,
                    date: new Date(photo.createdAt).toLocaleString(),
                    cameras: Array(5).fill(null),
                    allType: 1,  // Default to OK (1)
                };
            }

            // 각 카메라의 상태를 설정
            groupedData[photo.diecastUuid].cameras[photo.photoPosition - 1] = {
                image: photo.photoUrl,
                cropImage: null, // 이미지 크롭 처리
                type: photo.photoNgtype,
                description: NG_TYPES[photo.photoNgtype] || "Unknown",
            };

            // 하나라도 뜯김(0)이 있으면 'ALL' 상태를 뜯김(0)으로 설정
            if (photo.photoNgtype === 0) {
                groupedData[photo.diecastUuid].allType = 0;
            }
        });

        // 'ALL' 버튼에서 표시할 'type'을 모든 카메라 상태에서 반영
        // 뜯김(0)인 항목만 필터링
        return Object.values(groupedData).filter(item =>
            item.cameras.some(camera => camera && camera.type === 1)
        );
    };

    // 선택된 카메라가 변경될 때 데이터를 새로 가져옴
    useEffect(() => {
        fetchNGList(selectedCamera);
    }, [selectedCamera]);

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

            {/* 로딩 표시 */}
            {loading && <p className="loading-text">로딩 중...</p>}

            {/* NG 리스트 */}
            {!loading && (
                <div className="ng-list">
                    {data.map((item) => (
                        <div
                            className={`ng-item ${selectedItem && selectedItem.id === item.id ? "overlay" : ""}`}
                            key={item.id}
                            onClick={() => onItemClick(item)}
                        >
                            <img
                                src={item.cameras.find((camera) => camera)?.image || ''}
                                className="ng-image"
                                alt={`${item.objectName} NG`}
                            />
                            <span className="ng-description">
                                {item.cameras.find((camera) => camera)?.description || 'No Data'}
                            </span>
                            <span className="ng-name">
                                {item.objectName}
                            </span>
                            <span className="ng-camera">
                                {item.cameras.findIndex((camera) => camera) !== -1
                                    ? cameraNames[item.cameras.findIndex((camera) => camera)]
                                    : 'No Camera Data'}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NGList;