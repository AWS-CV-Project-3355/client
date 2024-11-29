import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import '../assets/css/Camera.css';
import NGDetail from './NGDetail';  // NGDetail 컴포넌트 불러오기

const cameraNames = [
    "대각선 왼쪽 위",  // 1번 카메라
    "대각선 오른쪽 위", // 2번 카메라
    "대각선 왼쪽 아래", // 3번 카메라
    "대각선 오른쪽 아래", // 4번 카메라
    "정면",            // 5번 카메라
];

const fakeImageUrl = "https://via.placeholder.com/150";  // 가짜 사진 URL (플레이스홀더 이미지)

const Camera = ({ selectedItem, onBackToList }) => {
    const navigate = useNavigate();
    const [photoList, setPhotoList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [modalData, setModalData] = useState(null); // 모달에 표시할 데이터

    useEffect(() => {
        if (selectedItem) {
            const fetchPhotos = async () => {
                try {
                    const response = await fetch(
                        `http://18.205.110.55:8080/diecast/${selectedItem.id}/photo/list`
                    );
                    const data = await response.json();
                    if (data.photoList) {
                        setPhotoList(data.photoList);
                    }
                } catch (error) {
                    console.error("사진 목록 불러오기 실패:", error);
                }
            };
            fetchPhotos();
        }
    }, [selectedItem]);

    // 방어 코드: selectedItem이 없으면 기본 메시지 표시
    if (!selectedItem) {
        return (
            <div className="main-container">
                <p>선택된 항목이 없습니다. 목록으로 돌아가 주세요.</p>
                <button className="back-button" onClick={onBackToList}>Back</button>
            </div>
        );
    }

    // 각 카메라 화면에 대해 사진 가져오기
    const getCameraPhoto = (cameraIndex) => {
        const photo = photoList.find((item) => item.photoPosition === cameraIndex);
        return photo || null; // 해당 카메라의 사진 정보 반환 (없으면 null)
    };

    // 모달을 열 때의 처리 함수
    const handleItemClick = (cameraPosition) => {
        const photoData = getCameraPhoto(cameraPosition);
        setModalData({
            id: selectedItem.id,
            cameraPosition: cameraPosition,
            image: photoData?.photoUrl || fakeImageUrl,
            description: photoData?.photoNgtype === 0 ? "NG" : "OK",
            cameraName: cameraNames[cameraPosition - 1],
        });
        setIsModalOpen(true);
    };

    // 모달을 닫을 때 처리하는 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    return (
        <div className="main-container">
            <div className="camera-container">
                <div>
                    <button className="back-button" onClick={onBackToList}>Back</button>
                    <h2 className="object-name">Object Name: {selectedItem.objectName}</h2>
                </div>

                {/* 각 카메라 화면 표시 */}
                {cameraNames.map((cameraName, index) => {
                    const photoData = getCameraPhoto(index + 1); // photoPosition은 1부터 시작
                    const imageToShow = photoData?.photoUrl || fakeImageUrl;

                    return (
                        <div key={index} className="camera-view">
                            <img
                                src={imageToShow}
                                alt={cameraName}
                                className="camera-image"
                                style={{
                                    border: photoData?.photoNgtype === 0 ? "2px solid red" : "none", // NG 표시
                                }}
                                key={selectedItem.id}
                                onClick={() => handleItemClick(index + 1)} // 카메라별 클릭 시 모달 띄우기
                            />
                            <p>{cameraName}</p>
                            <p className="camera-description"
                                style={{
                                    color: photoData?.photoNgtype === 0 ? "red" : "black",
                                }}>
                                {photoData ? (photoData.photoNgtype === 0 ? "NG" : "OK") : "No Data"}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* 모달 */}
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="NG 상세 정보"
                className="modal-content"
                overlayClassName="modal-overlay"
                appElement={document.getElementById('root')}
            >
                <div className="modal-body">
                    {modalData && (
                        <NGDetail onBack={closeModal} /> // NGDetail 컴포넌트로 이동
                    )}
                </div>
            </ReactModal>
        </div >
    );
};

export default Camera;
