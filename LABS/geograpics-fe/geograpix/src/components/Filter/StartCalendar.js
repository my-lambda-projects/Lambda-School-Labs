import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
 
const StartCalendar = (props) => {    

    return (
        <>
            <h4>Start Date</h4>
            
            <DatePicker
                selected={props.startDate} 
                onChange={date => props.setStartDate(date)} 
                showYearDropdown
                showMonthDropdown
                className='input'
                isClearable
                placeholderText="MM/DD/YYYY"
                dateFormat="MMMM d, yyyy"
                selectsStart
                todayButton="Today"
            />
        </>
    )
}

export default StartCalendar;