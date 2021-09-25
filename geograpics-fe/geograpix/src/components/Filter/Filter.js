import React, { useState } from 'react';

import StopCalendar from './StopCalendar'
import StartCalendar from './StartCalendar'
import StaticCalendar from './StaticCalendar'
import ProfileBar from '../ProfileBar'

//media
import FilterIcon from '../../assets/filter.svg'
import Moon from '../../assets/darkmode.svg'
import Sun from '../../assets/lightmode.svg'

const Filter = props => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const toggleDatePicker = (e) => {
      e.preventDefault();
      setShowDatePicker(!showDatePicker)
    }

    const closeDatePicker = (e) =>{
      e.preventDefault()
      setShowDatePicker(!showDatePicker)
    }
    console.log('FILTER', props);

    return(
        <>
            <div className="filter-panel">
                <button onClick={toggleDatePicker} className={props.dark ? "button-dark" : null}><img src={FilterIcon} alt='filter img'/></button>
                <button className={props.dark ? "button-dark" : null}><img onClick={()=> props.setDark(!props.dark)} src={props.dark ? Sun : Moon} alt='https://icons8.com'/></button>
            </div>
            {showDatePicker ? (
                <div className={props.dark ? "date-picker-dark" : "date-picker"}>
                    <div onClick={closeDatePicker}>&times;</div>
                    {/* <ProfileBar {...props}/> */}
                    <h3>Refine search by date</h3>
                    <StartCalendar startDate={props.startDate} setStartDate={props.setStartDate} />
                    <StopCalendar stopDate={props.stopDate} setStopDate={props.setStopDate} />
                    <StaticCalendar startDate={props.startDate} stopDate={props.stopDate}/>
                </div>
            ): null}
        </>
    )
}

export default Filter;