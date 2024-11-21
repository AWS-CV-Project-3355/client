import React from "react";
import '../assets/css/NGDetail.css';

const NGDetail = ({ item, onBack }) => {
    if (!item) {
        return <div className="ng-detail">Item not found</div>;
    }

    return (
        <div className="ng-detail">
            <button className="back-button" onClick={onBack}>Back</button>
            <h2>NG Detail</h2>
            <div className="ng-images">
                <img src={item.image} alt="NG 부품 사진" className="ng-image" />
                <img src={item.cropimage} alt="결함 위치 Crop" className="ng-cropimage" />
            </div>
            <h3>결함 안내</h3>
            <p>Status: {item.status}</p>
            <p>Camera: {item.camera}</p>
            <p>Description: {item.description}</p>
        </div>
    );
};

export default NGDetail;
