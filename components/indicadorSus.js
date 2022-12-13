import React, { useState, useEffect } from "react";
import { Chart } from 'primereact/chart';
import clienteAxios from "../config/clienteAxios";

const IndicadorSus = () => {
    const[indicadores, setIndicadores]=useState([])
    let x = [];
    let y = [];

    useEffect(() => {
        const listar = async () => {
          try {
            const res = await clienteAxios("/indicadores");
            setIndicadores(res.data)
             for(const dataObj of res.data){
                x.push(dataObj.x);
                y.push(dataObj.y);
            }
          } catch (error) {
            console.log(error);
          }
        };
        listar();
      },[]);

      const [multiAxisData] = useState({
        labels: x,
        datasets: [{
            label: 'Gestión 2022',
            backgroundColor: [
                '#EC407A',
                '#AB47BC',
                '#42A5F5',
                '#7E57C2',
                '#66BB6A',
                '#FFCA28',
                '#26A69A'
            ],
            yAxisID: 'y',
            data: y
        }]
    });
//inicio
const getLightTheme = () => {
    let horizontalOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
    let multiAxisOptions = {
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    min: 0,
                    max: 100,
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                    color: '#ebedef'
                },
                ticks: {
                    min: 0,
                    max: 100,
                    color: '#495057'
                }
            }
        }
    };

    return {
        horizontalOptions,
        multiAxisOptions
    }
}
//fin





const { basicOptions, horizontalOptions, multiAxisOptions, stackedOptions } = getLightTheme();
  return (
  <div className="col-12">
    <div className="card">
                <h5>Pacientes Atendidos por el SUS</h5>
                <Chart type="bar" data={multiAxisData} options={multiAxisOptions} />
            </div>

  </div>
  );
};
export default IndicadorSus;
