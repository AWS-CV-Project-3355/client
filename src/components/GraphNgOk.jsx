import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import '../assets/css/GraphNgOk.css';

const GraphNgOk = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState({ diecastOk: 0, diecastNg: 0 }); // 데이터를 저장할 state

    useEffect(() => {
        // API 호출하여 데이터 받아오기
        const fetchData = async () => {
            try {
                const response = await fetch('http://18.205.110.55:8080/diecast/graph/okng');
                const result = await response.json();
                setData(result); // 받아온 데이터로 state 업데이트
            } catch (error) {
                console.error("데이터를 불러오는 데 실패했습니다:", error);
            }
        };

        fetchData();
    }, []); // 컴포넌트가 처음 렌더링될 때만 호출

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
                    data: [data.diecastNg, data.diecastOk], // 받아온 데이터 사용
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
    }, [data]); // 데이터가 변경될 때마다 차트 갱신

    return (
        <div style={{ width: '100%', height: '200px', margin: '4px 4px' }}>
            <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default GraphNgOk;
