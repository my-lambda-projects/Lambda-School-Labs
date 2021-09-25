import React, { Component } from "react";
import BillingCard from "./BillingCard";
import Header from "./Header";
import styled from "styled-components";

const StyledMain = styled.div``;

const StyledTop = styled.div`
  color: white;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`
  padding: 25px 150px 0 150px;
  display: flex;
  flex-direction: column;

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 25px;
  }
`;

// const BillingTitle = styled.div `
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default class Billing extends Component {
  render() {
    return (
      <StyledMain>
        <StyledTop>
          <Header
            title="Billing"
            subTitle="Upgrade to a premium account with"
            isSubscribed={
              this.props.profile ? this.props.profile.isSubscribed : 0
            }
          />
        </StyledTop>

        <StyledBottom>
          <CardContainer>
            <BillingCard
              isSubscribed={
                this.props.profile ? this.props.profile.isSubscribed : 0
              }
              familyID={ this.props.familyID }
              loadAPIProfile={this.props.loadAPIProfile}
            />
          </CardContainer>
        </StyledBottom>
      </StyledMain>
    );
  }
}
