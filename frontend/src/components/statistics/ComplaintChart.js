import React from 'react'
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
const ComplaintChart = ({statistics}) => {
    const neighborhood =
    statistics &&
    statistics.map((d) => Object.values(d)[0]);
  const values =
    statistics && statistics.map((d) => Number(Object.values(d)[1]));
    console.log(neighborhood,values)
    const state = {
        dataPie: {
          labels: neighborhood,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
                "#AC64AD"
              ],
              hoverBackgroundColor: [
                "#FF5A5E",
                "#5AD3D1",
                "#FFC870",
                "#A8B3C5",
                "#616774",
                "#DA92DB"
              ]
            }
          ]
        }
      }
    return (
        <MDBContainer>
          <Pie data={state.dataPie} options={{ responsive: true }} />
        </MDBContainer>
  )
}

export default ComplaintChart