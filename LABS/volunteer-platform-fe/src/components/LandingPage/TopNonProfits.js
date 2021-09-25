import React, { useEffect } from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import orgPic1 from '../../assets/orgPic1.png';
import orgPic2 from '../../assets/orgPic2.png';
import orgPic3 from '../../assets/orgPic3.png';
import {useStateValue} from '../../hooks/useStateValue';
import {getTopOrganizations} from '../../actions/organization';
import { device } from '../../styled/deviceBreakpoints';
import LeadingCard from './LeadingCard';

export const TopNonProfits = () => {
  const [state, dispatch] = useStateValue();
  
  useEffect(() => {
    getTopOrganizations(dispatch);
  }, []);
  
  const hardCodedPics = {
      0: orgPic1,
      1: orgPic2,
      2: orgPic3
  }
  return (
    <StyledDiv>
      <h2>Our Featured Organizations<Icon type="thunderbolt" theme='twoTone'
                                          twoToneColor='#FA8C16'/></h2>
      <div className='nonprofits-cards'>
        
        {state.org.topOrganizations &&
        state.org.topOrganizations.map((org, i) => {
          if (i < 3){
            return (
              <LeadingCard 
                key={org.orgId}
                cover={<img src={org.imageUrl || hardCodedPics[i]} alt='nonprofit-org1'/>}
                title={org.organizationName}
                description='4.5/5'
              />
            );
          }
        })}
        
        <h5><Icon type="project"/>More Organizations</h5>
      </div>
    </StyledDiv>
  );
};

export default TopNonProfits;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    color: ${({theme}) => theme.primary8};
    margin: 4rem 0rem 1rem;
  }

  .nonprofits-cards {
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
