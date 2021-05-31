import React, {useState} from "react";
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const RealTimeChart = ({
                           title,
                           time,
                           value
                       }) => {
    const [dataArray] = useState([]);

    const data = {
        labels: [],
        datasets: [{
            label: title,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgb(255, 99, 132)',
            lineTension: 0.1,
            data: dataArray,
        }]
    }

    const options = {
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    onRefresh: function (chart) {
                        chart.data.datasets.forEach(function (dataset) {
                            dataset.data.push({
                                x: time,
                                y: value,
                            });
                        });
                    },
                    delay: 2000,
                    duration: 20000,
                }
            }],
            yAxes: [{
                ticks: {
                    min: 1,
                    max: 1000,
                }
            }]
        }
    }

    return (
        <div>
            <Line
                width={350}
                height={200}
                data={data}
                options={options}
            />
        </div>
    );
}

export default RealTimeChart;