// @ts-nocheck
import React from 'react';

import {
  StyledGuestProgressBar,
  TrackerChunk,
  FinalTrackerChunk,
  StyledLi,
} from './GuestProgressBar.styling';

import SectionContainer from './SectionContainer';
interface ProgressBar {
  tasks: {
    before: TaskList;
    during: TaskList;
    after: any;
  };
}

interface GuestDashInfo {
  guest_id: number;
  guest_name: string;
  email: string;
  phone: number;
  address: string;
  house_id: number;
  house_name: string;
  photo_url: string;
  house_address: string;
  default_ast: number;
  guest_guide: string;
  ast_guide: string;
  price: number;
  extra_fee: number;
  cleaning_fee: number;
  extra_guests: number;
  stay_receipt: string;
  stay_id: number;
  check_in: string;
  checkout: string;
  diff: number;
  checklist: {
    before: TaskList;
    during: TaskList;
    after: afterList;
  };
}

type afterList = [
  {
    [key: string]: TaskList;
  }
];

type TaskList = [Task];

interface Task {
  complete: any;
  task: string;
  items_id: number;
  stay_id: number;
}
//something
const GuestProgressBar = (props: ProgressBar) => {
  const { before, during, after } = props.tasks;
  
  console.log(before, 'Before mutation');
  let beforeProgress = Math.floor(
    (before.filter((task: Task) => task.complete === true).length /
      before.length) *
      100,
  );
  let duringProgress = Math.floor(
    (during.filter((task: Task) => task.complete === true).length /
      during.length) *
      100,
  );

  const reducer = (a: Task, b: Task) => {
    if (a.complete === true && b.complete === false) {
      return -1;
    }
    if (b.complete === true && a.complete === false) {
      return 1;
    }
    return 0;
  };

  const beforeOutput = [...before].sort(reducer);
  console.log(beforeOutput);
  const duringOutput = [...during].sort(reducer);
  console.log(duringOutput);

  if (beforeOutput.length === 0) {
    beforeOutput.push({
      complete: 1,
      task: 'before',
      items_id: 0,
      stay_id: 0,
    });
    beforeProgress = 100;
  }

  if (duringOutput.length === 0) {
    duringOutput.push({
      complete: 1,
      task: 'before',
      items_id: 0,
      stay_id: 0,
    });
    duringProgress = 100;
  }

  // prettier-ignore
  const overallProgress = Math.floor((80 * (duringProgress / 100)) + (20 * (beforeProgress / 100)),
  );

  return (
    // @ts-ignore
    <SectionContainer text='Preparation Progress'>
      <StyledGuestProgressBar>
        <p>Previous Guest Checkout</p>
        <span>{beforeProgress}%</span>
        <TrackerChunk>
          {beforeOutput.map((item: Task) => {
            return <StyledLi complete={item.complete} />;
          })}
        </TrackerChunk>
        <p>Getting Ready for you</p>
        <span>{duringProgress}%</span>
        <TrackerChunk>
          {duringOutput.map((item: Task) => {
            return <StyledLi complete={item.complete} />;
          })}
        </TrackerChunk>
        <p>Overall</p>
        <span>{overallProgress}%</span>
        <FinalTrackerChunk complete={overallProgress === 100 ? true : false} />
      </StyledGuestProgressBar>
    </SectionContainer>
  );
};

export default GuestProgressBar;
