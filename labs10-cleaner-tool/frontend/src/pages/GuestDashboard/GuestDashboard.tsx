import React from 'react';
import GuestInfo from './GuestInfo';
import useFetch from '../../helpers/useFetch';
import GuestProgressBar from './GuestProgressBar';
import MiscInfo from './MiscInfo';
import { StyledGuestDashboard } from './GuestDashboard.styling';
import defaultUser from '../../assets/default-user.jpg';

const backendURL = process.env.REACT_APP_backendURL;

const GuestDashboard = (props: any) => {
  console.log(props.match);
  const [fetchData, fetchErr, fetchLoading] = useFetch(
    `${backendURL}/gueststay/${props.match.params.id}`,
    true,
    'get',
  );
  console.log(fetchData);
  if (fetchErr.error === true) {
    throw fetchErr;
  }
  if (fetchLoading === true) {
    return (
      <div>
        <img src='../utils/loading.svg' />
      </div>
    );
  } else {
    return (
      <StyledGuestDashboard>
        <GuestInfo
          name={`${fetchData.guest_name}`}
          picture={fetchData.photo_url || defaultUser}
          houseLink='http://example.com'
          houseName={fetchData.house_name}
          checkIn={fetchData.check_in}
          checkOut={fetchData.check_out}
          houseAddress={fetchData.house_address}
        />
        <section>
          <h2>Stay Information and Progress</h2>
          <GuestProgressBar tasks={fetchData.checklist} />
          <MiscInfo id={props.match.params.id} />
        </section>
      </StyledGuestDashboard>
    );
  }
};

// need to make a commit

export default GuestDashboard;
