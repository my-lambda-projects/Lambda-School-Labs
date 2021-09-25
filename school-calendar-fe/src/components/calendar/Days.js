import React, { useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import useDate from '../../hooks/useDate';
import Day from './Day';
import DisabledDays from './DisabledDays.js';
import dayjs from 'dayjs';

const Days = ({ date, month }) => {
  const { templateFormOpen, selected, setSelected } = useContext(Context);

  const {
    cDate,
    daysInMonth,
    currentDay,
    currentMonth,
    currentYear,
    weekDayOfFirstDoM,
    weekDayOfLastDoM
  } = useDate(date);

  // console.log('month: ', month.format('MM'))
  // console.log('daysInMonth: ', daysInMonth)
  // console.log('currentDay: ', currentDay)
  // console.log('cDate: ', cDate)
  // console.log('weekDayOfFirstDoM', weekDayOfFirstDoM);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        flexWrap: 'wrap',
        // border: 'solid red 5px', // to change back, change <div> to <> with no style
        width: '100%'
      }}
    >
      {/* <> */}
      {/* accounts for the whitespace at the beginning of the month */}
      <DisabledDays days={weekDayOfFirstDoM} />

      {[...Array(daysInMonth).keys()].map(i => {
        // day is determined by items index + 1
        const day = i + 1;

        // used highlight current day
        const isToday =
          day === currentDay.date() &&
          currentMonth === currentDay.month() &&
          currentYear === currentDay.year();

        const isPicked = selected.includes(
          `${currentYear}-${currentMonth + 1 < 10 ? 0 : ''}${currentMonth +
            1}-${day < 10 ? 0 : ''}${day}`
        );

        const handleSelected = () => {
          //dateTime: "2020-02-28T08:30:00-08:00"

          //concatenated to w/ ternary to put into correct format
          const newdate = date
            .format('YYYY-MM')
            .concat(`-${day < 10 ? 0 : ''}${day}`);

          templateFormOpen
            ? selected.includes(newdate)
              ? setSelected(selected.filter(date => date !== newdate))
              : setSelected(selected.concat(newdate))
            : console.log('pick a template');
        };

        return (
          <Day
            key={i}
            i={i}
            isPicked={isPicked}
            handleSelected={handleSelected}
            month={month}
            cDate={cDate}
            isToday={isToday}
            day={day}
            date={date}
          />
        );
      })}

      {/* accounts for the whitespace at the end of the month */}
      <DisabledDays days={6 - weekDayOfLastDoM} />
      {/* </> */}
    </div>
  );
};

export default Days;
