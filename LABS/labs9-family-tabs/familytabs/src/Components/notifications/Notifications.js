import React, { Component } from "react";
import EventCard from "./EventCard";
import Header from "../Header";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import { Card } from "@blueprintjs/core";

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    padding: 0;
  }
`;

const StyledTop = styled.div`
  color: white;
  font-size: 64px;
  margin: 0 0 25px 0;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`
  padding: 0 150px 0 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 1220px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTabs = styled(Tabs)`
  height: 100%;
  width: 468px;
  padding: 0;
  margin-bottom: 25px;
  @media (max-width: 500px) {
    width: 98%;
    margin: 0 auto;
  }
`;

const StyledTabList = styled(TabList)`
  color: white;
  display: flex;
  justify-content: center;
`;

const StyledTab = styled(Tab)`
  border-left: 1px solid #22263c;
  border-right: 1px solid #22263c;
  color: white;
  background-color: #68659e;
  padding: 10px 10px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  font-family: "Roboto", sans-serif;
  font-size: 14px;

  :hover {
    color: #68659e;
    background-color: white;
    cursor: pointer;
  }
`;

const NoEventTab = styled(Card)`
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 10px;
  background-color: #68659e;
  padding: 100px 200px 100px 200px;
  color: white;
`;

const StyledPanel = styled(TabPanel)`
  background-color: #68659e;
  padding: 15px;
  border-left: 1px solid #22263c;
  border-right: 1px solid #22263c;
  border-radius: 0.5px;
`;

export default class Notifications extends Component {
  approveClick = async e => {
    e.preventDefault();
    const id = e.target.id;
    let approve = {
      approved: true,
      pendingApproval: false
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/event/edit/${id}`,
        approve
      );
      this.props.loadState(this.props.familyID);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (!this.props.family) {
      return <h1>loading...</h1>;
    }
    return (
      <StyledMain>
        <StyledTop>
          <Header
            title="Child Events"
            subTitle="Review pending events with"
            isSubscribed={
              this.props.profile ? this.props.profile.isSubscribed : 0
            }
          />
        </StyledTop>

        <StyledBottom>
          {" "}
          {this.props.familyEvents.length ? (
            <StyledTabs>
              <StyledTabList>
                <StyledTab>PENDING</StyledTab>
                <StyledTab>APPROVED</StyledTab>
                <StyledTab>DECLINED</StyledTab>
              </StyledTabList>

              <StyledPanel>
                {this.props.familyEvents
                  .filter(x => x.pendingApproval)
                  .map(eventData => (
                    <EventCard
                      //every event that is pending approval will pass these props to the event card component
                      //the word pending here by itself gives the event cards that are pending approval the prop pending===true
                      pending
                      key={eventData.id}
                      eventData={eventData}
                      family={this.props.family}
                      isAdmin={this.props.profile.isAdmin}
                      approveClick={this.approveClick}
                      loadState={this.props.loadState}
                      profile={this.props.profile}
                    />
                  ))}
              </StyledPanel>

              <StyledPanel>
                {this.props.familyEvents
                  .filter(x => x.approved)
                  .map(eventData => (
                    <EventCard
                      key={eventData.id}
                      family={this.props.family}
                      eventData={eventData}
                      loadState={this.props.loadState}
                      profile={this.props.profile}
                    />
                  ))}
              </StyledPanel>

              <StyledPanel>
                {this.props.familyEvents
                  .filter(x => x.declined)
                  .map(eventData => (
                    <EventCard
                      key={eventData.id}
                      family={this.props.family}
                      eventData={eventData}
                      loadState={this.props.loadState}
                      profile={this.props.profile}
                    />
                  ))}
              </StyledPanel>
            </StyledTabs>
          ) : (
            <NoEventTab>
              <p>No Events to Display</p>
            </NoEventTab>
          )}
        </StyledBottom>
      </StyledMain>
    );
  }
}
