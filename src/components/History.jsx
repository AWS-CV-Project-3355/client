import React, { useState, useEffect } from 'react';
import '../assets/css/History.css';
import axios from 'axios';

const History = ({ onItemClick, selectedItem }) => {
    const [uploadHistory, setUploadHistory] = useState([]);
    const [showNgOnly, setShowNgOnly] = useState(false);

    // 데이터 불러오기
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://18.205.110.55:8080/diecast/list');
                if (response.status === 200) {
                    const fetchedData = response.data.diecastList.map((item) => ({
                        id: item.diecastUuid,
                        objectName: `Object-${item.diecastUuid}`, // 오브젝트 이름 임시 설정
                        date: new Date(item.createdAt).toLocaleString(), // 날짜 포맷
                        cameras: [
                            {
                                type: item.diecastOkng, // 0: NG, 1: OK
                                description: item.diecastOkng === 1 ? 'NG' : 'OK',
                                image: null, // 이미지 설정 필요시 추가
                                cropImage: null,
                            },
                        ],
                    }));
                    setUploadHistory(fetchedData);
                } else {
                    console.error('Failed to fetch history:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);

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
                                className={`history-item-type ${item.cameras.some((camera) => camera.type === 1)
                                    ? 'ng'
                                    : 'ok'
                                    }`}
                            >
                                {item.cameras.some((camera) => camera.type === 1)
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
