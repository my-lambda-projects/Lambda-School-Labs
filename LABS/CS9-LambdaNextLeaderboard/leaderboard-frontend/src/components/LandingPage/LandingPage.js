import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Header,
  Button,
  Icon,
  Segment,
  List,
  Image
} from "semantic-ui-react";

import leadboardExample from "./img/LeadboardExample.PNG";
import githubLogo from "./img/github-logo.png";
import gitHuntrLogo from "./img/gitHuntrLogo.png";
import lambdaLogo from "./img/Lambda_Logo_Full.png";
import climbToTop from "./img/climbToTop.png";

import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { openModal: false };
  }

  handleCTAClick = () => {    
    this.props.handleCTAClick();
  };

  render() {
    return (
      <div>
        <Container fluid className="Landing__head">
          <Header
            as="h1"
            content="Next Steps"
            inverted
            textAlign="center"
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "3em"
            }}
          />
          <Header
            as="h2"
            content="Easily track student job progress."
            inverted
            textAlign="center"
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          />
          <Grid centered style={{ paddingBottom: "2em", paddingTop: "2em" }}>
            <Button primary size="huge" onClick={this.handleCTAClick}>
              Get Started
              <Icon name="right arrow" />
            </Button>
          </Grid>
        </Container>

        <Container fluid>
          <Segment padded="very">
            <Grid
              container
              stackable
              padded="vertically"
              verticalAlign="middle"
            >
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Github and Huntr data combined.{" "}
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Data fetched from Github and Huntr APIs provide up to date
                    information to track student effort and initiative towards
                    getting a job.
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Image bordered rounded size="massive" src={gitHuntrLogo} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Image bordered rounded size="huge" src={leadboardExample} />
                </Grid.Column>
                <Grid.Column floated="right" width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Fun and competitive leaderboards.{" "}
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Students are ranked based on tracked events, turning the job
                    hunt into a friendly competition!
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment vertical padded="very">
            <Grid celled="internally" columns="equal" stackable>
              <Grid.Row textAlign="center">
                <Grid.Column
                  style={{ paddingBottom: "4em", paddingTop: "4em" }}
                >
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    "Next Steps is the perfect way to ensure that our students
                    stay proactive in keeping their coding skills sharp."
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    <b>Bobby Lecturer</b> - Lambda School instructor, probably
                  </p>
                </Grid.Column>
                <Grid.Column
                  style={{ paddingBottom: "4em", paddingTop: "4em" }}
                >
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    "I always thought I made too many commits. Now it's taken me
                    to the top!"
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    <Image avatar src={githubLogo} />
                    <b>Nan</b> - Github user
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment style={{ padding: "4em 0em" }} vertical>
            <Container text>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Help everyone stay on top, to get to the top.
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Student effort reflects not only on the student, but the
                organization as well. Easily track and identify activities than
                can then be used to create a collaborative environment where
                everyone is capable of achieving their goals.
              </p>
              <Image bordered rounded size="large" centered src={climbToTop} />
              <Grid centered style={{ paddingTop: "4em" }}>
                <Button primary size="huge" onClick={this.handleCTAClick}>
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Grid>
            </Container>
          </Segment>

          <Segment
            inverted
            vertical
            style={{ padding: "1em 0em" }}
            className="Landing__footer"
          >
            <Container>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <List link inverted>
                      <List.Item as="a">About</List.Item>
                      <List.Item as={Link} name="pricing" to="/pricing">
                        Pricing
                      </List.Item>
                      <List.Item as="a">Contact Us</List.Item>
                    </List>
                  </Grid.Column>

                  <Grid.Column width={7}>
                    <Header inverted as="h4" content="Made by students from:" />
                    <Image
                      size="small"
                      as="a"
                      target="_blank"
                      href="https://lambdaschool.com/"
                      src={lambdaLogo}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default LandingPage;
