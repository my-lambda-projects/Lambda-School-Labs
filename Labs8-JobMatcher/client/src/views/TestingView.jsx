import React from "react";
import ExplicitBaseCard from "../presentation/BLKTestCard";
import { Row, Col, Button } from "reactstrap";
import TransitionGroup from "react-transition-group/TransitionGroup";

class TestingCard extends React.Component {
  state = {
    is_open: false,
    active: false
  };
  toggle = e => {
    this.setState({ is_open: !this.state.is_open });
  };
  moveRight = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <>
        <div className="content">
          {/*<Row>*/}
          {/*<Col>*/}
          <TransitionGroup>
            {this.state.active ? (
              <ExplicitBaseCard
                width={"350px"}
                photo={
                  "https://images.unsplash.com/photo-1527605555-b01c458b8029?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                }
                name={"Ariel Ray"}
                summary={
                  "I love UX Design, I live for it! I also love to snowboard and drink hot chocolate ain utah winters"
                }
                title={"UI/UX Designer"}
                skills={"sketch, programming, User Story, Personas, Color Theory, Adobe Creative Suite, Trello, Jira".split(
                  ", "
                )}
                extra_skills={"extra sketch, extra programming, extra User Story, extra Personas, extra Color Theory, extra Adobe Creative Suite, extra Trello, extra Jira".split(
                  ", "
                )}
                education={"Podium UX Design Intern"}
                experience={
                  "I have worked on different apps to make them look pretty"
                }
                is_expandable={true}
                fullCardArrow={this.toggle}
                is_open={this.state.is_open}
                btnSizeForAll={"ml"}
                is_valid={true}
                /* button one */
                btn1={this.moveRight}
                btn1color={"info"}
                // btn1Text={"Skip"}
                btn1ClassName={"btn-simple btn-icon"}
                btn1Icon={"far fa-thumbs-down"}
                /* button two */
                btn2={this.moveRight}
                btn2color={"primary"}
                // btn2Text={"Super"}
                btn2ClassName={"btn-simple btn-icon"}
                is_validbtn2={true}
                btn2Icon={"far fa-heart"}
                /* button three */
                btn3={this.moveRight}
                // btn3Text={"Call"}
                btn3color={"success"}
                btn3ClassName={"btn-simple btn-icon"}
                is_validbtn3={true}
                btn3Icon={"far fa-thumbs-up"}
                /*Drop down */
                dropDown={"job1, job2, jpb3, job4".split(", ")}
                dropDownToggleText={"Select Open position"}
              />
            ) : null}
          </TransitionGroup>
          <div>
            <Button>skip</Button>
            <Button onClick={this.moveRight}>Super </Button>
            <Button onClick={this.moveRight}>APP</Button>
          </div>
          {/*</Col>*/}
          {/*</Row>*/}
        </div>
      </>
    );
  }
}

export default TestingCard;
