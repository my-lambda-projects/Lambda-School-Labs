import React, { Component, Fragment } from "react";
import {
  Jumbotron,
  Container,
  NavLink,
  Nav,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getClasses, getUser } from "../../actions";
// import { ClassCard } from '../classCard';
import { LineChart } from "react-easy-chart";
import "./index.css";

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // classes: this.props.classes
      loaded: false
    }
    this.props.getClasses();
    this.props.getUser();
  }
  
  // componentWillReceiveProps() {
  //   this.props.getClasses()
  //   console.log("CLASSES in state from componentDidMount:", this.state.classes)
  //   console.log("this.props.classes from componentDidMount:", this.props.classes)

  //   if (this.state.classes.length > 0) {
  //     this.setState({
  //       classes_empty: false
  //     });
  //   } else if (this.state.classes.length === 0) {
  //     this.setState({
  //       classes_empty: true
  //     });
  //   }
  // }

  componentDidMount() {
    console.log(
      "this.props.classes from componentDidMount:",
      this.props.classes
    );
    
  }

  class_list_full_content() {
    return (
      <div className="jumbo-div">
        <div className="Class-div">
          {this.props.classes.map(classitem => {
            return (
              <Card id="Class-card">
                <Link
                  to={{
                    pathname: `/classes/${classitem._id}`,
                    state: {
                      // classid: classitem._id,
                      class: classitem
                    }
                  }}
                >
                  <CardBody>
                    <CardTitle>{classitem.name}</CardTitle>
                    <br />

                    <CardSubtitle>
                      Students: {classitem.students.length}
                      <br />
                      Participation: {classitem.participation}%
                    </CardSubtitle>
                  </CardBody>
                  <LineChart
                    // xDomainRange={[0, 100]}
                    yDomainRange={[-5, 150]}
                    xType={"time"}
                    // dataPoints
                    // axes
                    grid
                    verticalGrid
                    // interpolate={"cardinal"}
                    lineColors={["white"]}
                    width={210}
                    height={100}
                    data={[classitem.graph_data]}
                    style={{
                      // backgroundColor: "#584573",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  />
                </Link>
              </Card>
            );
          })}
          <Nav id="add-button">
            <Link to="/create" id="add-plus">
              {" "}
              +{" "}
            </Link>
          </Nav>
          <Nav id="createClass">
            <NavLink id="addButton" href="/create">
              {" "}
              add{" "}
            </NavLink>
          </Nav>
        </div>
      </div>
    );
  }

  class_list_empty_content() {
    return (
      <div className="jumbo-div">
        <div className="jumbo-div">
          <Jumbotron fluid id="jumb">
            <Container fluid>
              <div className="display-3">Start By Adding A Class</div>
              <Nav id="add-button" className="Empty-create">
                <NavLink href="/create" className="NewClass" id="add-plus">
                  +
                </NavLink>
              </Nav>
              <Nav id="createClass">
                <NavLink id="addButton" href="/create">
                  {" "}
                  add{" "}
                </NavLink>
              </Nav>
            </Container>
          </Jumbotron>
        </div>
      </div>
    );
  }

  render() {
    console.log("this.props.user:", this.props.user)
    if (this.props.classes.length > 0 && this.state.loaded) {
      return <Fragment>{this.class_list_full_content()}</Fragment>;
    } else if (this.props.classes.length === 0 && this.state.loaded) {
      return <Fragment>{this.class_list_empty_content()}</Fragment>;
    } else if (this.state.loaded === false){
      this.setState({
        loaded: true
      })
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classes,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { getClasses, getUser }
)(ClassList);
