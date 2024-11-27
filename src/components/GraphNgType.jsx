import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const GraphNgTypes = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState({
        photoNgtypeOne: 0,
        photoNgtypeTwo: 0,
        photoNgtypeThree: 0,
        photoNgtypeFour: 0,
    });

    // 각 라벨에 대한 색상 정의
    const labelColors = {
        '뜯김': '#ffd6d6',
        '미성형': '#ffb1b1',
        '찍힘': '#ff9292',
        '유로홀버': '#ff6c6c'
    };

    // 데이터 API 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://18.205.110.55:8080/photo/graph/ng/type');
                const result = await response.json();
                setData(result); // 받아온 데이터로 state 업데이트
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchData();
    }, []); // 컴포넌트가 처음 렌더링될 때만 호출

    useEffect(() => {
        // ECharts 인스턴스 생성
        const chart = echarts.init(chartRef.current);

        const options = {
            title: {
                text: '결함 종류', // 제목 설정
                left: 'center', // 제목 위치 설정
                textStyle: {
                    fontSize: 16,
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                left: '0%',
                right: '10%',
                top: '20%',
                bottom: '0%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: ['뜯김', '미성형', '찍힘', '유로홀버'], // X축 라벨
                axisTick: {
                    alignWithLabel: false,
                },
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                }
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    type: 'bar',
                    data: [
                        data.photoNgtypeOne,
                        data.photoNgtypeTwo,
                        data.photoNgtypeThree,
                        data.photoNgtypeFour,
                    ], // 받아온 데이터 사용
                    barWidth: '60%', // 막대 너비
                    itemStyle: {
                        // 각 x축 라벨에 맞는 색상 설정
                        color: (params) => labelColors[params.name],
                    },
                    label: {
                        show: true, // 숫자를 표시
                        position: 'top', // 막대 위에 표시
                        formatter: '{c}', // 데이터 값 표시
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#333', // 글자 색상
                    },
                },
            ],
        };

        chart.setOption(options);

        // 컴포넌트가 언마운트될 때 차트 인스턴스 해제
        return () => {
            chart.dispose();
        };
    }, [data]); // 데이터가 변경될 때마다 차트 갱신

    return (
        <div style={{ width: '100%', height: '180px', margin: '4px 4px' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default GraphNgTypes;
