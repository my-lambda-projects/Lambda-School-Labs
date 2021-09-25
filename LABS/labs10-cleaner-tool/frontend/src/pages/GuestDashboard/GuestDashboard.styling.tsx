import styled from '@emotion/styled';
import { InfoBox } from '../../components/InfoBox';

const pxRem = (px: number) => `${px / 16}rem`;
const pxToVUnitMaker = (maxSizeInPx: number) => (px: number) =>
  `${(px / maxSizeInPx) * 100}vh`;
const pxVw = pxToVUnitMaker(1080);
const pxVh = pxToVUnitMaker(1920);
const headerHeight = pxRem(144);

export const StyledGuestDashboard = styled('div')`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  & > section > h2 {
    display: none;
  }
  h1 {
    font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 2.25rem;
    text-align: left;
    padding-left: 0.5rem;
  }
  @media only screen and (min-width: 900px) {
    & > section {
      width: 100%;
      border: var(--border);
      padding-bottom: 1rem;
    }
    & > section > h2 {
      padding: 0.5rem 1.5rem;
      text-align: left;
      font-size: var(--header-font-size-secondary);
      background: var(--color-bg-accent);
      color: var(--color-text-light);
      display: block;
    }
  }
`;

export const GuestInfoWrapper = styled('div')`
  max-height: 300px;
  display: grid;
  justify-content: space-between;
  margin: 2.25rem 1rem 1.5rem 1rem;
  grid-template-areas:
    'picture picture'
    'guestName .'
    'stayingInfo stayingInfo'
    'houseAddress houseAddress'
    'checkinOut checkinOut';
  /* grid-template-rows: 25vmin auto auto auto 13vmin; */
  img {
    width: ${pxRem(72)};
    height: ${pxRem(72)};
    border-radius: 100%;
    margin: auto;
    object-fit: cover;
    grid-area: picture;
  }
  h3 {
    margin: 0 1.5rem 0.5rem 0;
    text-align: left;
    grid-area: guestName;
    font-size: 1.5rem;
    font-weight: bolder;
  }
  a,
  p {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 1rem;
  }
  a {
    margin-right: 1.5rem;
    text-align: left;
    grid-area: stayingInfo;
  }
  p {
    grid-area: houseAddress;
    margin: 0;
    display: flex;
    margin: 0rem 1.5rem 1.5rem 0;
  }
  .checkIn,
  .checkOut {
    border: var(--border);
  }
  .checkIn {
    grid-area: checkinOut;
    width: 45%;
    justify-self: start;
  }
  .checkOut {
    grid-area: checkinOut;
    width: 45%;
    justify-self: end;
  }

  @media only screen and (min-width: 900px) {
    margin: 2.25rem auto 1.5rem auto;
    height: ${headerHeight};
    width: auto;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1.5fr 1.5fr auto 1fr;
    grid-template-areas:
      'picture guestName guestName checkinOut checkinOut checkinOut'
      'picture stayingInfo stayingInfo checkinOut checkinOut checkinOut'
      'picture houseAddress houseAddress . . .'
      'picture . . . . .';
    img {
      height: ${headerHeight};
      width: ${pxVw(213)};
      margin: 0;
      border-radius: 0;
    }
    h3 {
      margin: 0;
      text-align: left;
      display: flex;
      align-items: flex-end;
      height: 100%;
    }
    a {
      text-align: left;
      display: flex;
      align-items: flex-end;
    }
    p {
      text-align: left;
    }
    .checkIn {
      grid-area: checkinOut;
      width: 45%;
      justify-self: start;
    }
    .checkOut {
      grid-area: checkinOut;
      width: 45%;
      justify-self: end;
    }
  }
`;

export const DateContainer = styled(InfoBox)`
  background-color: var(--color-bg-secondary);
  border: var(--border);
  padding: 0;
  align-content: center;
  justify-content: center;
  .text-main {
    font-size: 1.5rem;
  }
  .text-secondary {
    font-size: 1rem;
  }
`;
