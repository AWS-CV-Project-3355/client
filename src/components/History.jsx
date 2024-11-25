import React, { useState } from 'react';
import '../assets/css/History.css';

const History = () => {
    const [uploadHistory, setUploadHistory] = useState([
        // 테스트용 더미 데이터
        { id: 1, name: '20231013-20244012', date: '2023-10-13 20:24:12', type: 0 },
        { id: 2, name: '20231013-20244013', date: '2023-10-13 20:24:13', type: 1 },
        { id: 3, name: '20231013-20244014', date: '2023-10-13 20:24:14', type: 0 },
        { id: 4, name: '20231013-20244012', date: '2023-10-13 20:24:12', type: 0 },
        { id: 5, name: '20231013-20244013', date: '2023-10-13 20:24:13', type: 1 },
        { id: 6, name: '20231013-20244014', date: '2023-10-13 20:24:14', type: 0 },
        { id: 7, name: '20231013-20244012', date: '2023-10-13 20:24:12', type: 0 },
        { id: 8, name: '20231013-20244013', date: '2023-10-13 20:24:13', type: 1 },
        { id: 9, name: '20231013-20244014', date: '2023-10-13 20:24:14', type: 0 },
        { id: 10, name: '20231013-20244012', date: '2023-10-13 20:24:12', type: 0 },
        { id: 11, name: '20231013-20244013', date: '2023-10-13 20:24:13', type: 1 },
        { id: 12, name: '20231013-20244014', date: '2023-10-13 20:24:14', type: 0 },
    ]);

    const [showNgOnly, setShowNgOnly] = useState(false);

    // 필터링된 데이터
    const filteredHistory = showNgOnly
        ? uploadHistory.filter((item) => item.type === 0)
        : uploadHistory;

    return (
        <div className="upload-container">
            <p className="preview-text">기록</p>

            <div className="history-section">
                <div className='history-info-section'>
                    <p className="total-count">전체 {filteredHistory.length}개</p>
                    <div className='history-ng-section'>
                        <span className='object-ng-only'>NG만 보기</span>
                        <label className="toggle-container">
                            <input
                                type="checkbox"
                                checked={showNgOnly}
                                onChange={(e) => setShowNgOnly(e.target.checked)}
                                style={{ display: 'none' }} // 체크박스를 숨김
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                <div className='history-info-section2'>
                    <p className='object-name'>오브젝트명</p>
                    <p className='object-type'>타입</p>
                </div>

                {/* 히스토리 리스트 */}
                <div className="history-list">
                    {filteredHistory.map((item) => (
                        <div key={item.id} className="history-item">
                            <div className="history-item-info">
                                <span className="history-item-name">{item.name}</span>
                                <span className="history-item-date">{item.date}</span>
                            </div>

                            <span
                                className={`history-item-type ${item.type === 0 ? 'ng' : 'ok'
                                    }`}
                            >
                                {item.type === 0 ? 'NG' : 'OK'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default History;
