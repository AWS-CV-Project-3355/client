import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GraphNgTypes = () => {
    const chartRef = useRef(null);

    useEffect(() => {
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
                left: '10%',
                right: '10%',
                top: '15%',
                bottom: '10%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: ['뜯김', '미성형', '찍힘', '유로홀버'],
                axisTick: {
                    alignWithLabel: false,
                },
                axisLabel: {
                    interval: 0,
                    rotate: 30
                }
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    type: 'bar',
                    data: [152, 210, 120, 59],
                    barWidth: '40%', // 막대 너비
                    itemStyle: {
                        color: '#1f78b4',
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

        return () => {
            chart.dispose();
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '200px', margin: '0 0' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default GraphNgTypes;
