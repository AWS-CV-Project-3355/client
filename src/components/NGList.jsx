import React from "react";
import '../assets/css/NGList.css';

const NGList = ({ onItemClick }) => {
    const data = [
        { id: 1, image: "/path/to/image1.png", status: "NG", camera: "대각선 왼쪽 위", description: "1뜯김" },
        { id: 2, image: "/path/to/image2.png", status: "NG", camera: "대각선 오른쪽 위", description: "2뜯김" },
        { id: 3, image: "/path/to/image3.png", status: "NG", camera: "대각선 왼쪽 아래", description: "3뜯김" },
        { id: 4, image: "/path/to/image1.png", status: "NG", camera: "대각선 오른쪽 아래", description: "4뜯김" },
        { id: 5, image: "/path/to/image2.png", status: "NG", camera: "정면", description: "ng-뜯김" },
        { id: 6, image: "/path/to/image3.png", status: "NG", camera: "대각선 왼쪽 위", description: "ng-뜯김" },
        { id: 7, image: "/path/to/image1.png", status: "NG", camera: "대각선 왼쪽 위", description: "ng-뜯김" },
        { id: 8, image: "/path/to/image2.png", status: "NG", camera: "대각선 왼쪽 위", description: "ng-뜯김" },
        { id: 9, image: "/path/to/image3.png", status: "NG", camera: "대각선 왼쪽 위", description: "ng-뜯김" },
    ];

    return (
        <div className="ng-list">
            {data.map((item) => (
                <div
                    className="ng-item"
                    key={item.id}
                    onClick={() => onItemClick(item.id)}
                >
                    <img src={item.image} className="ng-image" />
                    <span className="ng-description">{item.description}</span>
                    <span className="ng-camera">{item.camera}</span>
                </div>
            ))}
        </div>
    );
};

export default NGList;
