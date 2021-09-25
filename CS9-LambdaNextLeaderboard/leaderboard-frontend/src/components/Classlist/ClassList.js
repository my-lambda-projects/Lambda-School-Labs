//________MODULES________
import React, { Component } from "react";
import { connectAsync } from "iguazu";

import { queryAllMyData, queryStudents, queryGithub } from "../../actions";
//________STYLING________
import "./ClassList.css";
import CardClass from "./CardClass";
import AddClass from "./AddClass";

//________CLASSLIST________
class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (localStorage.getItem("invalid")) {
      localStorage.removeItem("token");
      localStorage.removeItem("invalid");
      localStorage.removeItem("email");
      localStorage.removeItem("adminID");
      localStorage.removeItem("organization");
      this.props.props.props.history.push("/");
    }
    if (localStorage.getItem("token") === null) {
      this.props.props.props.history.push("/");
      localStorage.removeItem("invalid");
      localStorage.removeItem("adminID");
      localStorage.removeItem("organization");
      localStorage.removeItem("email");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (localStorage.getItem("invalid")) {
      localStorage.removeItem("token");
      localStorage.removeItem("invalid");
      localStorage.removeItem("adminID");
      localStorage.removeItem("organization");
      localStorage.removeItem("email");
      this.props.props.props.history.push("/");
    }
    if (localStorage.getItem("token") === null) {
      localStorage.removeItem("invalid");
      localStorage.removeItem("adminID");
      localStorage.removeItem("organization");
      localStorage.removeItem("email");
      this.props.props.props.history.push("/");
    }
  }

  render() {
    // if (localStorage.getItem("invalid")) {
    //     localStorage.removeItem("invalid");
    //     this.props.props.props.history.push('/')
    // }

    if (this.props.isLoading()) {
      if (localStorage.getItem("invalid")) {
        localStorage.removeItem("token");
        localStorage.removeItem("invalid");
        localStorage.removeItem("organization");
        localStorage.removeItem("email");
        this.props.props.props.history.push("/");
      }
      return <div>Loading...</div>;
    }

    if (this.props.loadedWithErrors()) {
      return <div>Oh no! Something went wrong</div>;
    }
    // const class = this.props.class
    // const students = this.props.students

    if (this.props.loadedWithErrors()) {
      return <div>Oh no! Something went wrong</div>;
    }
    // const class = this.props.class
    // const students = this.props.students

    if (this.props.classdata.length > 0) {
      // console.log('myData', this.props.class[0].name);
      console.log("students", this.props.students);
      this.props.students.forEach(each => {});
      return (
        <div className="APP__CLASSLIST">
          {/*{this.props.class.length > 0} {*/}
          {/**/}
          {/*}*/}

          {this.props.classdata.map((each, index) => {
            // console.log(this.props.students[index].classname)
            const students_in_class = [];
            this.props.students.forEach(each => {
              if (each.classname === this.props.classdata[index].name) {
                students_in_class.push(each);
              }
            });
            console.log("array of students", students_in_class);
            return (
              <div key={each + index}>
                <CardClass
                  props={this.props.props.props}
                  classname={this.props.classdata[index].name}
                  student={students_in_class}
                  classID={this.props.classdata[index]._id}
                />
              </div>
            );
          })}
          <AddClass solo={"no"} />
        </div>
      );
    } else {
      // Highlight "Add a new class", if there are no classes
      return <AddClass solo={"yes"} />;
    }
  }
}

//________EXPORT________
// export default ClassList;
export function loadDataAsProps({ store, ownProps }) {
  const { dispatch } = store;

  const path = "/"; // Use the actual path when it's created as needed
  console.log(ownProps);
  return {
    classdata: () => dispatch(queryAllMyData(path)),
    students: () => dispatch(queryStudents())
    // github: () => dispatch(queryGithub())
  };
}

export default connectAsync({ loadDataAsProps })(ClassList);
