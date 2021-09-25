import styled from '@emotion/styled';
import Card from '../../components/Card';

export const StyledGuestProgressBar = styled('div')`
  padding: 1.5rem 1rem;
  font-family: Roboto;
  margin: 0 auto 0 auto;
  display: grid;
  background-color: white;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 40px 30px;
  grid-auto-flow: column;
  grid-template-areas:
    'previous current overall'
    'previousProgress currentProgress overallProgress';
  align-items: stretch;
  justify-content: stretch;
  font-size: var(--font-size-primary);
  width: 100%;
  p {
    display: none;
  }
  @media only screen and (min-width: 900px) {
    grid-template-areas:
      'lable1 label2 label3'
      'previous current overall'
      'previousProgress currentProgress overallProgress';
    grid-template-rows: auto 40px 30px;
    p {
      display: block;
    }
  }
`;

export const StyledLi = styled.li`
  border: solid 1px black;
  flex: 1;
  background: var(--color-accent-light);
  filter: ${(props: { complete: number }) =>
    props.complete === 1 ? 'opacity(100%)' : 'opacity(50%)'};
`;

export const TrackerChunk = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

export const FinalTrackerChunk = styled.span`
  border: solid 1px black;
  flex: 1;
  background: var(--color-accent-light);
  filter: ${(props: { complete: boolean }) =>
    props.complete === true ? 'opacity(100%)' : 'opacity(50%)'};
`;
