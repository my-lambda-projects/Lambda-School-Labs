import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
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



function Chart3(props){

    

    const [data, setData] = useState({
        labels: ["Overall", "Cleanliness", "Host", "Cleanliness", "Cleanliness"],
        datasets: [
          {
            label: "You",
            backgroundColor: "#3c9684",
            data: [3,4,5,5,5,0] //<- 0 present for scaling purposes
          }, {
            label: "Them",
            backgroundColor: "#3be3ae",
            data: [4,5,5,5,5,0] //<- 0 present for scaling purposes
          }
        ]
      })

      useEffect(() => {
        if(props.comparisonFetched){
            setData({
                labels: ["Overall", "Cleanliness", "Communication", "Location", "Value"],
                datasets: [ 
                {
                    label: "You",
                    backgroundColor: "#3c9684",
                    data: [
                        props.listing.review_scores_rating / 10,
                        props.listing.review_scores_cleanliness,
                        props.listing.review_scores_communication,
                        props.listing.review_scores_location,
                        props.listing.review_scores_value,
                        //--------------
                        0               //<- 0 present for scaling purposes
                    ] 
                },
                {
                    label: "Them",
                    backgroundColor: "#3be3ae",
                    data: [
                        props.comparison.review_scores_rating / 10,
                        props.comparison.review_scores_cleanliness,
                        props.comparison.review_scores_communication,
                        props.comparison.review_scores_location,
                        props.comparison.review_scores_value,
                        //--------------
                        0               //<- 0 present for scaling purposes
                    ] 
                }
                ]
            })}
      }, [props.comparisonFetched])

      if (!props.comparisonFetched && !props.isDemo) {
        return (
            <div style = {{ position: "relative", width: "100%", height: "30vh" }}>
                <LoaderContainer>
                    <StyledLoader type="TailSpin" color="grey" height={80} width={80} />
                </LoaderContainer>
            </div>
        );
      }

    return (
        <div style = {{ position: "relative", width: "100%", height: "30vh", marginBottom: "50px" }}>
            <Bar
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
                            barPercentage: 0.5,
                            barThickness: 50,
                            maxBarThickness: 70,
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)" //<- hides gridlines
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'category'
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)" //<- hides gridlines
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'rating/10'
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
      comparison: state.comparison,
      comparisonFetched: state.comparisonFetched,
      isDemo: state.isDemo
  }
}

export default connect(mapStateToProps, {})(withRouter(Chart3));
