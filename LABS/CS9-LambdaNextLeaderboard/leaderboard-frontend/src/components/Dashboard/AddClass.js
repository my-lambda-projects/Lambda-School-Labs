import React, { Component } from "react";
import { Segment, Header, Icon, Form, Label } from "semantic-ui-react";
import {connect} from 'react-redux'

class AddClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newClassName: "",
      message: "It will COST YOU a shiny New PENNY, please create a subscription plan for YOUR Organization",
      toggle: false
    };
  }

  handleInput = (e, { value }) => {
    this.setState({ newClassName: value });
    this.props.addClassErrors.name = "";
  };

  handleSubmit = () => {
    if (this.props.getSubscriptionInfo.subscriptionID === null) {
      this.setState({toggle: true})
    } else {
      this.props.addClass({
        id: this.props.orgId,
        name: this.state.newClassName
      });
    }

  };

  render() {
    if (this.state.toggle === false && this.props.getSubscriptionInfo !== null) {
      return (
        <Segment.Group>
          <Segment inverted color="blue">
            <Header as="h2" icon textAlign="center" size="huge">
              <Icon name="graduation cap" circular />
              <Header.Content>
                Add New Class to {this.props.orgName}
              </Header.Content>
            </Header>
          </Segment>

          <Segment>
            <Form>
              <Form.Field error={Boolean(this.props.addClassErrors.name)}>
                {this.props.addClassErrors.name ? (
                  <Label
                    color="red"
                    pointing="below"
                    content={this.props.addClassErrors.name}
                  />
                ) : null}
                <Form.Input
                  placeholder="New class name"
                  onChange={this.handleInput}
                />
                <Form.Button
                  content="Create my class"
                  color="green"
                  onClick={this.handleSubmit}
                />
              </Form.Field>
            </Form>
          </Segment>
        </Segment.Group>
      );
    } else {
      return (
        <div>
          <h1>{this.state.message}</h1>
        </div>
      )
    }

  }
}

const mapStateToProps = state => {
  return {
    getSubscriptionStatus: state.getSubscriptionStatus,
    getSubscriptionInfo: state.getSubscriptionInfo
  }
}

export default connect(mapStateToProps, {})(AddClass)
