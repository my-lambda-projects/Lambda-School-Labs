import React, { useEffect } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import volunteerPic1 from '../../assets/volunteerPic1.png';
import volunteerPic2 from '../../assets/volunteerPic2.png';
import volunteerPic3 from '../../assets/volunteerPic3.png';
import { useStateValue } from '../../hooks/useStateValue';
import { getTopVolunteers } from '../../actions/auth';
import { device } from '../../styled/deviceBreakpoints';
import LeadingCard from './LeadingCard';

export const TopVolunteers = () => {
  
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    getTopVolunteers(dispatch);
  }, []);

  const hardCodedPics = {
    0: volunteerPic1,
    1: volunteerPic2,
    2: volunteerPic3,
  };

  return (
    <StyledDiv>
      <h2>
        Leading Volunteers
        <Icon type="fire" theme="twoTone" twoToneColor="#FA8C16" />
      </h2>
      <div className="volunteer-cards">
        {state.auth.topVolunteers &&
          state.auth.topVolunteers.map((volunteer, i) => {
            if (i < 3) {
              return (
                <LeadingCard 
                  key={volunteer.uid}
                  cover={
                    <img
                      src={volunteer.imageUrl || hardCodedPics[i]}
                      alt={`volunteer${i}`}  
                    />
                  }
                  title={`${volunteer.firstName} ${volunteer.lastName[0]}.`}
                  description="10.25 hours/mo."
                />
              );
            }
          })}

        <h5>
          <Icon type="reconciliation" />
          More Volunteers
        </h5>
      </div>
    </StyledDiv>
  );
};

export default TopVolunteers;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    color: ${({ theme }) => theme.primary8};
    margin: 4rem 0rem 1rem;
  }

  .volunteer-cards {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 40px;

    .ant-card-body {
      padding: 4px;
    }

    h5 {
      margin: 1rem 1.5rem;
      color: ${({ theme }) => theme.gray7};
      width: 210px;
      font-size: 1.2rem;

      @media ${device.tablet} {
        margin: 0.6rem;
        text-align: center;
      }
    }
  }
`;
