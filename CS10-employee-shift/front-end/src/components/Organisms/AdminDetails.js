import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { Card, Icon, Image } from "semantic-ui-react";
import { AdminDetailsContainer } from "../../styles/Admin.js";

const AdminDetails = props => {
  console.log(props.account);
  return (
    <AdminDetailsContainer>
      <Card raised>
        {props.account.enabled ? (
          <Icon
            name="star"
            size="huge"
            color="yellow"
            inverted
            style={{ position: "absolute", top: -30, left: -30, zIndex: 50 }}
          />
        ) : null}
        <Image src={props.account.logo} size="small" />
        <Card.Content>
          <Card.Header>{props.account.company}</Card.Header>
          <Card.Meta style={{ padding: "10px" }}>
            <Icon name="user" />
            {/* {`  Size:  ${props.account ? props.account.profile_set.length : 0}`} */}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          {props.account.enabled ? (
            <div>
              <Card.Description>Plan Expires:</Card.Description>
              <Card.Description>
                {moment(props.account.plan_expires).format(
                  "dddd, MMMM Do YYYY, h:mm a"
                )}
              </Card.Description>
            </div>
          ) : null}
        </Card.Content>
      </Card>
    </AdminDetailsContainer>
  );
};

const mapStateToProps = state => {
  return {
    account: state.user.currentUser.account,
  };
};

export default connect(
  mapStateToProps,
  null
)(AdminDetails);
