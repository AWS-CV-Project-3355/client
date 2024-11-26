import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../assets/css/Graph.css';

const Graph = () => {
    // 각 그래프의 ref 생성
    const chartRefs = {
        chart1: useRef(null),
        chart2: useRef(null),
        chart3: useRef(null),
        chart4: useRef(null),
        chart5: useRef(null),
    };

    // x축 라벨
    const xLabels = ['뜯김', '미성형', '찍힘', '유로홀버'];
    const titleTexts = [
        '오른쪽 대각선 아래',
        '왼쪽 대각선 아래',
        '오른쪽 대각선 위',
        '왼쪽 대각선 위',
        '정면'
    ];

    // 각 x축 라벨에 대한 색상 맵
    const labelColors = {
        '뜯김': '#ffd6d6',
        '미성형': '#ffb1b1',
        '찍힘': '#ff9292',
        '유로홀버': '#ff6c6c'
    };

    // 샘플 데이터 생성 함수
    const generateData = () => {
        return [52, 21, 12, 5]; // 샘플 데이터
    };

    // 차트 옵션 생성 함수
    const getChartOption = (data, title) => {
        return {
            title: {
                text: title, // 각 차트에 개별 제목 설정
                left: 'center',
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
                right: '0%',
                top: '20%',
                bottom: '0%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: xLabels, // x축 라벨
                axisTick: {
                    alignWithLabel: false,
                },
                axisLabel: {
                    interval: 0,
                    rotate: 0
                }
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    type: 'bar',
                    data: data, // 생성된 데이터
                    barWidth: '60%', // 막대 너비
                    itemStyle: {
                        // 각 라벨에 맞는 색상을 설정
                        color: (params) => labelColors[xLabels[params.dataIndex]],
                    },
                    label: {
                        show: true, // 막대 위에 숫자 표시
                        position: 'top', // 숫자 위치
                        formatter: '{c}', // 데이터 값 표시
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#333', // 글자 색상
                    },
                },
            ],
        };
    };

    useEffect(() => {
        const charts = {};

        Object.entries(chartRefs).forEach(([key, ref], index) => {
            if (ref.current) {
                charts[key] = echarts.init(ref.current);
                charts[key].setOption(getChartOption(generateData(), titleTexts[index]));
            }
        });

        const handleResize = () => {
            Object.values(charts).forEach(chart => chart.resize());
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Object.values(charts).forEach(chart => chart.dispose());
        };
    }, []);

    return (
        <div className="graphs-container">
            <p className='preview-text'>불량률</p>

            {/* 그래프들 */}
            <div className="graphs-section">
                <div className="graph-item" style={{ width: '92%', height: '100px' }}>
                    <div ref={chartRefs.chart1} className="chart-container" style={{ width: '100%', height: '100%' }}></div>
                </div>

                <div className="graph-item" style={{ width: '92%', height: '100px' }}>
                    <div ref={chartRefs.chart2} className="chart-container" style={{ width: '100%', height: '100%' }}></div>
                </div>

                <div className="graph-item" style={{ width: '92%', height: '100px' }}>
                    <div ref={chartRefs.chart3} className="chart-container" style={{ width: '100%', height: '100%' }}></div>
                </div>

                <div className="graph-item" style={{ width: '92%', height: '100px' }}>
                    <div ref={chartRefs.chart4} className="chart-container" style={{ width: '100%', height: '100%' }}></div>
                </div>

                <div className="graph-item" style={{ width: '92%', height: '100px' }}>
                    <div ref={chartRefs.chart5} className="chart-container" style={{ width: '100%', height: '100%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Graph;
