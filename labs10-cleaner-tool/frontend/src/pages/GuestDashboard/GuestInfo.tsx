import React from 'react';
import { generateDisplayDate } from '../utils';
import { GuestInfoWrapper, DateContainer } from './GuestDashboard.styling';
interface GuestInfoProps {
  name: string;
  picture: string;
  houseLink: string;
  houseName: string;
  checkIn: string;
  checkOut: string;
  houseAddress: string;
}

const GuestInfo = (props: GuestInfoProps) => {
  const {
    name,
    picture,
    houseLink,
    houseName,
    checkIn,
    checkOut,
    houseAddress,
  } = props;
  return (
    <GuestInfoWrapper>
      <img src={picture} alt={`Picture of ${name}`} />
      <h3>{name}</h3>
      <a href='#'>{`Staying at ${houseName}`}</a>
      <p>{houseAddress}</p>
      <DateContainer
        main={generateDisplayDate(checkIn)}
        secondary='Check-In'
        className='checkIn'
      />
      <DateContainer
        main={generateDisplayDate(checkOut)}
        secondary='Check-Out'
        className='checkOut'
      />
    </GuestInfoWrapper>
  );
};

export default GuestInfo;
