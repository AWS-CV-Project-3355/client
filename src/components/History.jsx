import React, { useState } from 'react';
import '../assets/css/History.css';
import testImg from '../assets/img/test_img.png';

const History = ({ onItemClick, selectedItem }) => {
    const [uploadHistory, setUploadHistory] = useState([
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
        {
            id: 4,
            objectName: "20231014-12345678",
            date: "2023-10-14 12:34:56",
            cameras: [
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
                { image: testImg, cropImage: null, type: 1, description: null },
            ],
        },
    ]);


    const [showNgOnly, setShowNgOnly] = useState(false);

    // 필터링된 데이터
    const filteredHistory = showNgOnly
        ? uploadHistory.filter((item) =>
            item.cameras.some((camera) => camera.type === 0)
        )
        : uploadHistory;

    return (
        <div className="upload-container">
            <p className="preview-text">기록</p>

            <div className="history-section">
                <div className="history-info-section">
                    <p className="total-count">전체 {filteredHistory.length}개</p>
                    <div className="history-ng-section">
                        <span className="object-ng-only">NG만 보기</span>
                        <label className="toggle-container">
                            <input
                                type="checkbox"
                                checked={showNgOnly}
                                onChange={(e) => setShowNgOnly(e.target.checked)}
                                style={{ display: 'none' }}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                <div className="history-info-section2">
                    <p className="object-name">오브젝트명</p>
                    <p className="object-type">타입</p>
                </div>

                {/* 히스토리 리스트 */}
                <div className="history-list">
                    {filteredHistory.map((item) => (
                        <div
                            key={item.id}
                            className={`history-item ${selectedItem && selectedItem.id === item.id ? 'overlay' : ''}`}
                            onClick={() => onItemClick(item)} // 수정: item을 그대로 전달
                        >
                            <div className="history-item-info">
                                <span className="history-item-name">{item.objectName}</span>
                                <span className="history-item-date">{item.date}</span>
                            </div>

                            {/* NG/OK 상태 출력 */}
                            <span
                                className={`history-item-type ${item.cameras.some((camera) => camera.type === 0)
                                    ? 'ng'
                                    : 'ok'
                                    }`}
                            >
                                {item.cameras.some((camera) => camera.type === 0)
                                    ? 'NG'
                                    : 'OK'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;
