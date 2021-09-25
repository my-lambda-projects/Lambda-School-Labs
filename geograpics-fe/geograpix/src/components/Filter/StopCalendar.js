import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
 
const StopCalendar = (props) => {
    

    return (
        <>
            <h4>End Date</h4>
            
            <DatePicker
                selected={props.stopDate} 
                onChange={date => props.setStopDate(date)}
                // inline 
                showYearDropdown
                showMonthDropdown
                isClearable
                className='input'
                placeholderText="MM/DD/YYYY"
                dateFormat="MMMM d, yyyy"
                selectsEnd
                todayButton="Today"
            />
        </>
    )
}

export default StopCalendar;