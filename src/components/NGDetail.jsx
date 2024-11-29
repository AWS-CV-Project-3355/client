import React from "react";
import '../assets/css/NGDetail.css';
import yolo from '../assets/img/yolo.png';

const NGDetail = ({ onBack }) => {
    return (
        <div className="ng-detail">
            <button className="back-button" onClick={onBack}>Back</button>
            <div className="ng-images-list">
                <img src={yolo} alt="결함 위치" className="ng-cropimage" />
            </div>
            <h3>결함 안내</h3>
            <p>Camera: 3번 카메라</p>
            <p>Description: NG 찍힘</p>
        </div>
    );
};

export default NGDetail;
