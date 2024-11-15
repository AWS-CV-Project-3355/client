import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import '../assets/css/Upload.css';

const Upload = () => {
    const [uploadHistory, setUploadHistory] = useState([
        // 테스트용 더미 데이터
        { id: 1, name: 'test_image_1.jpg', date: '2024-03-15 14:30:22' },
        { id: 2, name: 'test_image_2.jpg', date: '2024-03-15 14:25:15' },
        { id: 3, name: 'test_image_3.jpg', date: '2024-03-15 14:20:10' },
    ]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newUpload = {
                id: Date.now(),
                name: file.name,
                date: new Date().toLocaleString('ko-KR'),
            };
            setUploadHistory([newUpload, ...uploadHistory]);
        }
    };

    return (
        <div className="upload-container">
            <p className="preview-text">Input Photo</p>

            {/* 업로드 버튼 영역 */}
            <div className="button-section">
                <label className="upload-button" htmlFor="file-upload">
                    <UploadIcon size={24} />
                    <span>사진 업로드</span>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                <label className='enroll-button' htmlFor='file-enroll'>
                    <span>등록</span>
                </label>
            </div>

            {/* 업로드 기록 영역 */}
            <div className="history-section">
                <h3>업로드 기록</h3>
                <div className="history-list">
                    {uploadHistory.map((item) => (
                        <div key={item.id} className="history-item">
                            <label>
                                <input
                                    type='checkbox'
                                />
                            </label>
                            <div className="history-item-info">
                                <span className="history-item-name">{item.name}</span>
                                <span className="history-item-date">{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Upload;