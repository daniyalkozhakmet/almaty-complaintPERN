import React,{useEffect} from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
const UserChart=({time,values})=>{
    console.log(time,values)
    const state = {
        dataBar: {
          labels: time,
          datasets: [
            {
              label: "User",
              data: values,
              backgroundColor: [
                "rgba(255, 134,159,0.4)",
                "rgba(98,  182, 239,0.4)",
                "rgba(255, 218, 128,0.4)",
                "rgba(113, 205, 205,0.4)",
                "rgba(170, 128, 252,0.4)",
                "rgba(255, 177, 101,0.4)"
              ],
              borderWidth: 2,
              borderColor: [
                "rgba(255, 134, 159, 1)",
                "rgba(98,  182, 239, 1)",
                "rgba(255, 218, 128, 1)",
                "rgba(113, 205, 205, 1)",
                "rgba(170, 128, 252, 1)",
                "rgba(255, 177, 101, 1)"
              ]
            }
          ]
        },
        barChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                barPercentage: 1,
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }
      return (
        <MDBContainer style={{height:'30%'}}>
          <h3 className="mt-5">The User registeration statistics</h3>
          <Bar data={state.dataBar} options={state.barChartOptions} />
        </MDBContainer>
      );
}

export default UserChart;