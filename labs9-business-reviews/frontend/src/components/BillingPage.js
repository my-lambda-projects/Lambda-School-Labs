import React, { Component } from 'react';
import styled from 'styled-components';
import BillingForm from './BillingForm';
import NavBar from './NavBar';

const StyledBilling = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 110px;
  button {
    background-color: #eed974;
    font-size: 1.25rem;
    padding: 10px;
    font-size: 20px;
    width: 300px;
    height: 70px;
    margin-top: 30px;
  }
`;

class BillingPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <StyledBilling>
          <div className='billing'>
            <BillingForm>
              <button>Buy Now</button>
            </BillingForm>
          </div>
        </StyledBilling>
      </div>
    );
  }
}

export default BillingPage;
