import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../assets/css/GraphNgOk.css';

const GraphNgOk = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // ECharts 인스턴스 생성
        const chart = echarts.init(chartRef.current);

        // 차트 옵션 설정
        const options = {
            title: {
                text: '양불판정', // 제목 설정
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
                top: '20%',
                left: '0%',
                bottom: '0%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: ['NG', 'OK'], // X축 라벨
                axisTick: {
                    alignWithLabel: false,
                },
                axisLabel: {
                    interval: 0,
                }
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    type: 'bar',
                    data: [57, 150], // 각각 NG와 OK의 개수
                    itemStyle: {
                        color: function (params) {
                            return params.dataIndex === 0
                                ? 'red'
                                : 'green';
                        },
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

        // 옵션을 차트에 적용
        chart.setOption(options);

        // 컴포넌트가 언마운트될 때 차트 인스턴스 해제
        return () => {
            chart.dispose();
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '200px', margin: '4px 4px' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default GraphNgOk;
