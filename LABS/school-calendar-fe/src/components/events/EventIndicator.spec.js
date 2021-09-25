import React from 'react'
import dayjs from 'dayjs';
import Day from './Day'
import EventsIndicator from './EventIndicator'
import {shallow} from 'enzyme';
import matchTheEvents from './Day'
import useDate from '../../hooks/useDate'



let events = [
  {
    title: "test",
    start:{dateTime:"2020-04-25T13:00:00-04:00"}
  },
  {
    title: "test2",
    start:{dateTime:"2020-04-25T13:00:00-04:00"}
  }
]

let eventNameArr = ["2020-04-25", "2020-04-25", "2020-04-28", "2020-04-29"]
let titles = ["My Event", "Other Testing Event", "stuff and things", "party"]



// let theDay = require('./Day');
// theDay.matchTheEvents = jest.fn(()=>{
//     let formattedDate = "2020-04-29"
//     let eventTitle= "My Event";
//     return <EventsIndicator
//             key={formattedDate}
//             event={formattedDate}
//             eventTitle={eventTitle}
//             fontSize="2px"
//             />
// })

// matchTheEvents(eventNameArr, currentYear, currentMonth, day, events, titles);

const handleSelected = jest.fn(()=>{})
let date = {
  year: jest.fn(()=>{return 2020}),
  month: jest.fn(()=>{return 3}),
  daysInMonth: jest.fn(()=>{return 30}),
}

describe('EventsIndicator', ()=>{

    it('should render', ()=>{
        const wrapper = shallow(<Day key={0} i={0} isPicked={false} handleSelected={handleSelected} isToday={false} day={25} date={date} events={events} eventNameArr={eventNameArr} titles={titles}/>)
        matchTheEvents(eventNameArr, 2020, 3, 25, titles);
        let stuff = wrapper.find(EventsIndicator);
    })





    // it('should render', ()=>{
    //     const wrapper = shallow(<EventsIndicator event={"2020-04-26"} eventTitle={"My Event"}/>)
    //     console.log('logging', wrapper.debug())
    // })
})