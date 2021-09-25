import React, { Component } from "react";
import Week from "./Week";
import styled from "styled-components";
import { connect } from 'react-redux';

const Month = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 90%;
  width: 100%;
  margin: auto;
  margin-top: 1%;
`;

class Calendar extends Component {
  state = {
    September: [
      {
        date: "09/1/2019"
      },
      {
        date: "09/2/2019"
      },
      {
        date: "09/3/2019"
      },
      {
        date: "09/4/2019"
      },
      {
        date: "09/5/2019"
      },
      {
        date: "09/6/2019"
      },
      {
        date: "09/7/2019"
      },
      {
        date: "09/8/2019"
      },
      {
        date: "09/9/2019"
      },
      {
        date: "09/10/2019"
      },
      {
        date: "09/11/2019"
      },
      {
        date: "09/12/2019"
      },
      {
        date: "09/13/2019"
      },
      {
        date: "09/14/2019"
      },
      {
        date: "09/15/2019"
      },
      {
        date: "09/16/2019"
      },
      {
        date: "09/17/2019"
      },
      {
        date: "09/18/2019"
      },
      {
        date: "09/19/2019"
      },
      {
        date: "09/20/2019"
      },
      {
        date: "09/21/2019"
      },
      {
        date: "09/22/2019"
      },
      {
        date: "09/23/2019"
      },
      {
        date: "09/24/2019"
      },
      {
        date: "09/25/2019"
      },
      {
        date: "09/26/2019"
      },
      {
        date: "09/27/2019"
      },
      {
        date: "09/28/2019"
      },
      {
        date: "09/29/2019"
      },
      {
        date: "09/30/2019"
      }
    ],
    October: [
      {
        date: "10/01/2019"
      },
      {
        date: "10/02/2019"
      },
      {
        date: "10/03/2019"
      },
      {
        date: "10/04/2019"
      },
      {
        date: "10/05/2019"
      },
      {
        date: "10/06/2019"
      },
      {
        date: "10/07/2019"
      },
      {
        date: "10/08/2019"
      },
      {
        date: "10/09/2019"
      },
      {
        date: "10/10/2019"
      },
      {
        date: "10/11/2019"
      },
      {
        date: "10/12/2019"
      },
      {
        date: "10/13/2019"
      },
      {
        date: "10/14/2019"
      },
      {
        date: "10/15/2019"
      },
      {
        date: "10/16/2019"
      },
      {
        date: "10/17/2019"
      },
      {
        date: "10/18/2019"
      },
      {
        date: "10/19/2019"
      },
      {
        date: "10/20/2019"
      },
      {
        date: "10/21/2019"
      },
      {
        date: "10/22/2019"
      },
      {
        date: "10/23/2019"
      },
      {
        date: "10/24/2019"
      },
      {
        date: "10/25/2019"
      },
      {
        date: "10/26/2019"
      },
      {
        date: "10/27/2019"
      },
      {
        date: "10/28/2019"
      },
      {
        date: "10/29/2019"
      },
      {
        date: "10/30/2019"
      }
    ]
  };

  monthToWeeks = month => {
    let weeks = [[], [], [], [], []];
    // Day of week of first day of month
    const firstDay = new Date(month[0].date).getDay();
    // Adds blank days to beginning of first week
    for (let i = 0; i < firstDay; i++) {
      weeks[0].unshift({
        date: "blank"
      });
    }
    //Populate weeks
    let weekIterator = 0;
    for (let i = 0; i < month.length; i++) {
      if (new Date(month[i].date).getDay() === 0 && weeks[0].length !== 0) {
        weekIterator++; // If day is Sunday and first week isn't empty, move on to next week
      }
      weeks[weekIterator].push(month[i]);
    }
    return weeks;
  };

  render() {
    let month = "October";
    if(this.props.isDemo) {
      month = "September";
    }
    
    let calendarArray = this.monthToWeeks(this.state[`${month}`])

    return (
      <Month>
        {calendarArray.map(week => {
          return <Week week={week} key={Math.random()} />;
        })}
      </Month>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isFetching: state.isFetching,
      listings: state.listings,
      error: state.error,
      isDemo: state.isDemo
  }
}

export default connect(mapStateToProps, null)(Calendar);
