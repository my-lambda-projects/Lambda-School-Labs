import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';


function Chart(props){

    const [data, setData] = useState({labels: [], datasets: []})

    useEffect(() => {
        if(data.labels.length === 0){
            setData({
                labels: ["1", "2", "3", "4", "5"],
                datasets: [
                  {
                      label: "Videos Mades",
                      backgroundColor: "tomato",
                      data: [4, 5, 1, 10, 32, 2, 12] 
                  },
                  {
                      label: "Subscriptions",
                      backgroundColor: "yellow",
                      data: [14, 15, 21, 0, 12, 24, 32] 
                  },
                ]
              }
            )
        }

    }, [data])

    const setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.95, "red");
        return gradient;
      }

    const getChartData = (canvas) => {
        const dataa = data;

        if(dataa.datasets){
          let colors = ["red", "purple"];
          dataa.datasets.forEach((set, i) => {
            set.backgroundColor = !setGradientColor(canvas, colors[i]);
            set.borderColor = "green";
            set.borderWidth = 2;
          });
        }
        return dataa;
      }
    

    return (
        <div style = {{ position: "relative", width: 600, height: 550, marginTop: "10vh" }}>
            <Line
                options = {{
                    responsive: true,
                    maintainAspectRatio: false,
                }}
                // data = {this.state.data}
                data = {getChartData}
            />
        </div>
    )
}

export default Chart;