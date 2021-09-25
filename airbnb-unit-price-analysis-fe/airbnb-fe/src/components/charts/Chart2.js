import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const LoaderContainer = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledLoader = styled(Loader)`
`;




function Chart2(props){

    const [data, setData] = useState({
        // labels: ["10", "20", "30", "40", "50", "60", "70"],
        labels: [10, 20, 30, 40, 50, 60, 70],
        datasets: [
          {
              label: "Percentile",
              backgroundColor: "#3be3ae",
              data: [0, 8, 18, 32, 18, 8, 0] 
          },
        //   {
        //       label: "Subscriptions",
        //       backgroundColor: "yellow",
        //       data: [14, 15, 21, 0, 12, 24, 32] 
        //   },
        ]
      })


    

    useEffect(() => {
        if(props.pricingFetched){
            setData({
                ...data,
                labels: [
                    `$${props.pricingPercentile.percentiles[0]}`,
                    `$${props.pricingPercentile.percentiles[1]}`,
                    `$${props.pricingPercentile.percentiles[2]}`,
                    `$${props.pricingPercentile.percentiles[3]}`,
                    `$${props.pricingPercentile.percentiles[4]}`,
                    `$${props.pricingPercentile.percentiles[5]}`,
                    `$${props.pricingPercentile.percentiles[6]}`,
                    `$${props.pricingPercentile.percentiles[7]}`,
                    `$${props.pricingPercentile.percentiles[8]}`,
                    `$${props.pricingPercentile.percentiles[9]}`,
                ],
                datasets: [
                    {
                        label: "Count per price",
                        backgroundColor: "#3be3ae",
                        data: props.listingsPerPercentile
                    }
                ]
            })
        }
    }, [props.pricingFetched])

    if (!props.pricingFetched) {
        return (
            <div style = {{ position: "relative", width: "100%", height: "100%"}}>
                <LoaderContainer>
                    <StyledLoader type="TailSpin" color="grey" height={80} width={80} />
                </LoaderContainer>
            </div>
        );
      }

    return (
        <div style = {{ position: "relative", width: "100%", height: "100%"}}>
            <Line
                options = {{
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)" //<- hides gridlines
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'price range'
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)" //<- hides gridlines
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'listings'
                            }
                        }]
                    }
                }}
                data = {data}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pricingFetched: state.pricingFetched,
        isDemo: state.isDemo
    }
  }
  
  export default connect(mapStateToProps, {})(withRouter(Chart2));