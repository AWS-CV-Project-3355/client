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

    // 샘플 데이터 생성 함수
    const generateData = (base) => {
        return Array.from({ length: 100 }, (_, i) => [
            i,
            Math.abs(Math.sin(i * 0.1) * base + Math.random() * 5)
        ]);
    };

    // 차트 옵션 생성 함수
    const getChartOption = (data) => {
        return {
            grid: {
                left: '10%',
                right: '5%',
                top: '10%',
                bottom: '15%'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    return `Time: ${params[0].value[0]}s<br/>Value: ${params[0].value[1].toFixed(2)}`;
                }
            },
            xAxis: {
                type: 'value',
                // name: 'Time(s)',
                // nameLocation: 'middle',
                // nameGap: 25,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                // name: 'Value',
                // nameLocation: 'middle',
                // nameGap: 40
            },
            series: [{
                data: data,
                type: 'line',
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 2,
                    color: '#1a73e8'
                },
                areaStyle: {
                    opacity: 0.1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#1a73e8'
                        },
                        {
                            offset: 1,
                            color: '#fff'
                        }
                    ])
                }
            }]
        };
    };

    // 차트 초기화 및 렌더링
    useEffect(() => {
        const charts = {};

        // 각 차트 초기화
        Object.entries(chartRefs).forEach(([key, ref]) => {
            if (ref.current) {
                charts[key] = echarts.init(ref.current);
                charts[key].setOption(getChartOption(generateData(20 + Math.random() * 20)));
            }
        });

        // 반응형 처리
        const handleResize = () => {
            Object.values(charts).forEach(chart => chart.resize());
        };
        window.addEventListener('resize', handleResize);

        // 클린업
        return () => {
            window.removeEventListener('resize', handleResize);
            Object.values(charts).forEach(chart => chart.dispose());
        };
    }, []);

    return (
        <div className="graph-container">
            <h2>불량률</h2>

            {/* 그래프들 */}
            <div className="graphs-section">
                <div className="graph-item">
                    <div ref={chartRefs.chart1} className="chart-container"></div>
                    <div className="graph-title">대각선 왼쪽 위</div>
                </div>

                <div className="graph-item">
                    <div ref={chartRefs.chart2} className="chart-container"></div>
                    <div className="graph-title">대각선 오른쪽 위</div>
                </div>

                <div className="graph-item">
                    <div ref={chartRefs.chart3} className="chart-container"></div>
                    <div className="graph-title">대각선 왼쪽 아래</div>
                </div>

                <div className="graph-item">
                    <div ref={chartRefs.chart4} className="chart-container"></div>
                    <div className="graph-title">대각선 오른쪽 아래</div>
                </div>

                <div className="graph-item">
                    <div ref={chartRefs.chart5} className="chart-container"></div>
                    <div className="graph-title">정면</div>
                </div>
            </div>
        </div>
    );
};

export default Graph;