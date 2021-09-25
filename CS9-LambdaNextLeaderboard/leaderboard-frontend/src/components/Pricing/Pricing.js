import React from "react";
import {
  Container,
  Header,
  Grid,
  Card,
  List,
  Button,
  Icon
} from "semantic-ui-react";

import "./Pricing.css";

const Pricing = props => {
  return (
    <div>
      <Container>
        <Header
          as="h1"
          content="Pricing"
          textAlign="center"
          style={{
            fontSize: "4em",
            fontWeight: "normal",
            marginTop: "2em"
          }}
        />
        <Header
          as="h2"
          content="Plans to accomodate all class sizes."
          textAlign="center"
          style={{
            fontSize: "1.7em",
            fontWeight: "normal",
            marginTop: "1em",
            marginBottom: "2em"
          }}
        />
        <Grid container centered stretched padded="horizontally">
          <Grid.Column width={5}>
            <Card raised className="Pricing__card">
              <Card.Content header textAlign="center">
                <h2>Free</h2>
              </Card.Content>
              <Card.Content>
                <List divided relaxed size="huge">
                  <List.Item>
                    <List.Content>
                      <List.Header as="h1">$0/month</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="address card" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>1</strong> Admin User
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="users" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>1</strong> Class
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="user" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>50</strong> Students
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Content>
              <Card.Content extra>
                <Button primary size="large" onClick={props.handleCTAClick}>
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={5} className="Pricing__border--feature">
            <Card raised className="Pricing__card--feature">
              <Card.Content header textAlign="center">
                <h2>Standard</h2>
              </Card.Content>
              <Card.Content>
                <List divided relaxed size="huge">
                  <List.Item>
                    <List.Content>
                      <List.Header as="h1">$10/month</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="address card" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>5</strong> Admin Users
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="users" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>10</strong> Classes
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="user" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>500</strong> Students
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Content>
              <Card.Content extra>
                <Button primary size="large" onClick={props.handleCTAClick}>
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column width={5}>
            <Card raised className="Pricing__card">
              <Card.Content header textAlign="center">
                <h2>Premium</h2>
              </Card.Content>
              <Card.Content>
                <List divided relaxed size="huge">
                  <List.Item>
                    <List.Content>
                      <List.Header as="h1">$15/month</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="address card" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>Unlimited</strong> Admin Users
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="users" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>Unlimited</strong> Classes
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description className="Pricing__cardDescription">
                        <Icon name="user" circular />
                      </List.Description>
                      <List.Description className="Pricing__cardDescription--text">
                        <strong>Unlimited</strong> Students
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Content>
              <Card.Content extra>
                <Button primary size="large" onClick={props.handleCTAClick}>
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Pricing;
