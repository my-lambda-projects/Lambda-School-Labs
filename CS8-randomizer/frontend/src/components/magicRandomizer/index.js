import React, { Component, Fragment} from "react";

// import middleusel from "./middleusel";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import {
  getClasses,
  updateParticipation,
  updateGraphData
} from "../../actions";
import swal from "sweetalert";

import "./magicRandomizer.css";
import "./NoTrackAll.css";
import "./NoTrackNoAll.css";
import "./TrackAll.css";
import "./TrackNoAll.css";
import { connect } from "react-redux";
import { LineChart } from "react-easy-chart";
// import { on } from "cluster";

class MagicRandomizer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      className: "",
      classid: this.props.match.params.id,
      class: this.props.location.state.class,
      students: this.props.location.state.class.students,
      allstudents: [],
      current_student: [],
      on_deck_student: [],
      allMode: this.props.location.state.class.allMode,
      trackMode: this.props.location.state.class.trackMode,
      randInit: false,
      participated: this.props.location.state.class.participation,
      call_record: [],
      participation_rate: 0,
      graph_data: [],
      spotlight: [],
      shuffled: false,
      width: 800,
      height: 400,
      axes: true
    };
  }

  toggle = () => {
    (this.props.location.state.class.allMode = !this.props.location.state.class
      .allMode),
      this.setState({ allMode: this.props.location.state.class.allMode });
    console.log(this.state.allMode);
  };

  idGetter = () => {
    let classes = this.props.classes;
    let id;

    for (let i = 0; i < classes.length; i++) {
      // console.log('updating', classes[i]._id);
      if (classes[i]._id === this.props.match.params.id) {
        id = classes[i]._id;
        this.setState({
          class: id
        });

        console.log("mounted id", this.state.class);
      }
    }
  };

  // checkHandler = () => {
  //   this.setState({
  //     allMode: !this.state.allMode
  //   })

  //   console.log('check handler', this.state.allMode);
  // }

  // =========== Line Chart Dimensions Update Code ========= //
  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    console.log("UPDATE_DIMENSIONS");
    // iPhone X
    if (window.innerWidth <= 500) {
      let update_width = window.innerWidth * 0.8;
      let update_height = Math.round(update_width / 2);
      this.setState({
        width: update_width,
        height: update_height,
        axes: false
      });
    } else if (window.innerWidth <= 500 && window.innerWidth <= 740) {
      let update_width = window.innerWidth * 0.85;
      let update_height = Math.round(update_width / 2);
      this.setState({ width: update_width, height: update_height, axes: true });
    } else if (window.innerWidth <= 740 && window.innerWidth <= 900) {
      let update_width = window.innerWidth * 0.8;
      let update_height = Math.round(update_width / 2);
      this.setState({ width: update_width, height: update_height, axes: true });
    } else if (window.innerWidth <= 900 && window.innerWidth <= 1100) {
      let update_width = window.innerWidth * 0.7;
      let update_height = Math.round(update_width / 2);
      this.setState({ width: update_width, height: update_height, axes: true });
    }else if (window.innerWidth <= 1100 && window.innerWidth <= 1300) {
      let update_width = window.innerWidth * 0.65;
      let update_height = Math.round(update_width / 2);
      this.setState({ width: update_width, height: update_height, axes: true });
    }else if (window.innerWidth <= 1300 && window.innerWidth <= 1500) {
      let update_width = window.innerWidth * 0.5;
      let update_height = Math.round(update_width / 2);
      this.setState({ width: update_width, height: update_height, axes: true });
    }else if (window.innerWidth >= 1500) {
      let update_width = window.innerWidth * 0.4;
      let update_height = Math.round(update_width / 2);
      this.setState({ width: update_width, height: update_height, axes: true });
  }
}

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount() {
    this.props.getClasses();
    console.log("mount", this.props);

    // TODO: Consider other ways of making randomizer use easier!
    // if (this.props.classes.length <= 1) {
    //   swal({
    //     title: "Getting Started with Randomizer",
    //     text:
    //       "If ` Tracking Mode ` AND  ``is ON (graph is visible):\n\nClicking `Reset All Go` will randomly shuffle your deck.\nOnce the `RANDOMIZER` button is clicked, the name of the first student to call on will appear.\nClick the appropriate button for whether the student `Participated` or `Declined`.\n\n  If ` Tracking Mode` is OFF (no graph visible):\n\nSimply use the `RANDOMIZER` button to randomly select a student in the class."
    //   });
    // }

    this.setState({
      graph_data: this.make_graph_data()
    });
    console.log(
      "this.props.location.state.class.graph_data",
      this.props.location.state.class.graph_data
    );
    // Graph Dimensions Update Event Listener
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    if (this.state.allMode == false) {
      this.randomHandler();
    } else if (this.state.allMode == true) {
      // this.shuffle_allstudents();
    }

    console.log("STATE at end of componentDidMount:", this.state);
  }

  randomHandler = () => {
    // let current_student = this.state.current_student;
    let student_copy = this.state.students.slice(0);
    // The spotlight object will hold the current and on_deck students

    if (
      this.state.current_student.length === 0 &&
      this.state.on_deck_student.length === 0
    ) {
      console.log("STUDENT_COPY", student_copy.length);
      const current =
        student_copy[Math.floor(Math.random() * student_copy.length)];
      console.log("CURRENT:", current);
      console.log("CURRENT INDEX:", student_copy.indexOf(current));
      student_copy.splice(student_copy.indexOf(current), 1);
      const on_deck =
        student_copy[Math.floor(Math.random() * student_copy.length)];
      this.setState({
        current_student: current,
        on_deck_student: on_deck
      });

      console.log("RANDOMHANDLER");
      console.log("CURRENT_STUDENT:", this.state.current_student);
      console.log("ON_DECK_STUDENT:", this.state.on_deck_student);
      // console.log("SPOTLIGHT ON DECK:", this.state.spotlight[1]);
    } else if (
      this.state.current_student.length !== 0 &&
      this.state.on_deck_student.length !== 0
    ) {
      const updated_current_student = this.state.on_deck_student;
      console.log("STUDENT ARRAY BEFORE SPLICE:", student_copy);
      student_copy.splice(student_copy.indexOf(this.state.on_deck_student), 1);
      console.log("STUDENT ARRAY AFTER SPLICE:", student_copy);
      const updated_on_deck =
        student_copy[Math.floor(Math.random() * student_copy.length)];
      this.setState({
        on_deck_student: updated_on_deck,
        current_student: updated_current_student
      });
    }
  };

  allGoHandler = () => {
    console.log("ALLGOHANDLER");
    // let allArray = this.state.allstudents.slice(0); // TODO: Remove unneccessary allstudents, and just grab from this.state.students
    if (this.state.allstudents.length > 0) {
      if (this.state.shuffled === true) {
        // shifts allstudents[0] off the array, and updates new current_student and on_deck_student
        this.shift_allstudents();
      }
      // This needs to be an "if" NOT an "else if" so it is tested every time!
      if (this.state.shuffled === false) {
        // Randomly shuffles allstudents, then sets current_student and on_deck_student
        this.shuffle_allstudents();
      }
    }

    if (this.state.allstudents.length <= 0) {
      if (this.state.trackMode === true) {
        console.log("ALLSTUDENTS EMPTY!!!");
        // Runs once the deck is empty
        // Throws sweet alert with current participation_rate
        swal({
          // icon: "success",
          className: "out_of_students",
          title: `${Math.floor(
            this.state.participation_rate
          )}% of your class participated this round!`
        });

        // updates graph_data and participation_rate in state
        this.date_format();

        // updates mLab participation property for this class
        this.props.updateParticipation({
          class_id: this.props.match.params.id,
          participation: Math.floor(
            this.state.graph_data[this.state.graph_data.length - 1].y
          )
        });
        this.props.updateGraphData({
          class_id: this.props.match.params.id,
          graph_data: this.state.graph_data
        });

        this.setState({
          graph_data: this.state.graph_data,
          allstudents: [],
          shuffled: false,
          call_record: []
        });
      } else if (this.state.trackMode == false) {
        swal({
          // icon: "success",
          className: "out_of_students",
          title: `That's all your students! Please click Reset to continue randomizing!`
        });
      }
    }
  };

  shuffle_allstudents = () => {
    let allArray = this.state.students.slice(0);
    const shuffle = () => {
      console.log("SHUFFLING");
      var j, x, i;
      for (i = allArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = allArray[i];
        allArray[i] = allArray[j];
        allArray[j] = x;
      }
      return allArray;
    };
    allArray = shuffle(allArray);
    const new_allstudents = [];
    allArray.map(item => {
      new_allstudents.push(item);
    });
    this.setState({
      allstudents: new_allstudents,
      on_deck_student: new_allstudents[1],
      current_student: new_allstudents[0]
    });

    console.log(
      "MAKE SURE the first two students in allstudents are in fact the current_student and on_deck_student"
    );
    console.log("allstudents:", this.state.allstudents);
    console.log("current_student:", this.state.current_student);
    console.log("on_deck_student:", this.state.on_deck_student);

    this.setState({
      shuffled: true
    });
  };

  shift_allstudents = () => {
    console.log("NOT SHUFFLING");
    // allArray[0] is removed from the array using .shift().
    const shifted_allstudents = this.state.allstudents;
    shifted_allstudents.shift();
    this.setState({
      allstudents: shifted_allstudents
    });

    console.log("all_students shifted????", this.state.allstudents);

    if (this.state.allstudents[1] === undefined) {
      this.setState({
        on_deck_student: "slot empty"
      });
    } else if (this.state.allstudents[1] !== undefined) {
      this.setState({
        on_deck_student: this.state.allstudents[1]
      });
    }

    // This conditional should never be used, since all of this is wrapped in `if (allArray.length>0)`
    // and if allArray[0] === undefined, that means that allArray is empty.
    if (this.state.allstudents[0] === undefined) {
      this.setState({
        current_student: "slot empty"
      });
    } else if (this.state.allstudents[0] !== undefined) {
      this.setState({
        current_student: this.state.allstudents[0]
      });
    }
  };

  participatedHandler = () => {
    let update_call_record = this.state.call_record;
    update_call_record.push("1");
    this.setState({
      call_record: update_call_record,
      participation_rate: Math.floor(
        (update_call_record.filter(item => item === "1").length /
          update_call_record.length) *
          100
      )
    });
    console.log("this.state in participateHandler", this.state);

    this.auto_randomize();

    if (this.state.allMode === false && this.state.trackMode === true) {
      this.date_format();

      // updates mLab participation property for this class
      this.props.updateParticipation({
        class_id: this.props.match.params.id,
        participation: Math.floor(
          this.state.graph_data[this.state.graph_data.length - 1].y
        )
      });
      this.props.updateGraphData({
        class_id: this.props.match.params.id,
        graph_data: this.state.graph_data
      });

      this.setState({
        graph_data: this.make_graph_data()
      });
      // To show CALL-RECORD
      console.log(
        this.state.call_record.filter(item => item === "1").length,
        "/",
        this.state.call_record.length
      );
    } else if (this.state.allMode === true) {
    }
  };

  // This is only active when trackMode is TRUE
  declinedHandler = () => {
    let update_call_record = this.state.call_record;
    update_call_record.push("0");
    this.setState({
      randInit: true,
      call_record: update_call_record,
      participation_rate:
        (update_call_record.filter(item => item === "1").length /
          update_call_record.length) *
        100
    });
    console.log("this.state in declinedHandler", this.state);

    this.auto_randomize();

    if (this.state.allMode === false) {
      // updates this.state.graph_data with current this.state.participation_rate AND
      // clears the call_record EVERY TIME Decline is pressed
      this.date_format();

      // updates mLab participation property for this class
      this.props.updateParticipation({
        class_id: this.props.match.params.id,
        participation: Math.floor(
          this.state.graph_data[this.state.graph_data.length - 1].y
        )
      });
      this.props.updateGraphData({
        class_id: this.props.match.params.id,
        graph_data: this.state.graph_data
      });

      this.setState({
        graph_data: this.make_graph_data()
      });
      // To show CALL-RECORD
      console.log(
        this.state.call_record.filter(item => item === "1").length,
        "/",
        this.state.call_record.length
      );
    } else if (this.state.allMode === true) {
    }
  };

  auto_randomize = () => {
    if (this.state.allMode === true) {
      this.allGoHandler();
    } else if (this.state.allMode === false) {
      this.randomHandler();
    }
  };

  participationTracker = () => {
    console.log("CALL_RECORD", this.state.call_record);

    if (this.state.call_record.length === 0) {
      return "";
    } else {
      console.log(
        this.state.call_record.filter(item => item === "1").length,
        "/",
        this.state.call_record.length
      );
      return (
        Math.floor(
          (this.state.call_record.filter(item => item === "1").length /
            this.state.call_record.length) *
            100
        ) + "%"
      );
    }
  };

  recalculate_participation_rate = () => {
    // Makes a copy of this.state.graph_data
    const updated_graph_data = this.state.graph_data; // Check, is .slice(0) necessary?

    console.log(
      "updated_graph_data[this.state.graph_data.length-1]:",
      updated_graph_data[this.state.graph_data.length - 1]
    );
    updated_graph_data[this.state.graph_data.length - 1].y = Math.floor(
      (updated_graph_data[this.state.graph_data.length - 1].y +
        this.state.participation_rate) /
        2
    );
    // TODO: Look at this console.log and update the code appropriately:
    console.log(
      "If this:",
      this.state.graph_data,
      " is different from this: ",
      updated_graph_data,
      " then .slice(0) IS necessary to ensure you are not mutating the state without using setState"
    );
    // This conditional just ensures that the call_record is NOT reset when allMode is false.
    if (this.state.allMode === false && this.state.trackMode === true) {
      this.setState({
        graph_data: updated_graph_data
      });
    } else {
      this.setState({
        call_record: [],
        graph_data: updated_graph_data
      });
    }
  };

  // This method creates some initial fake graph_data to give new users a visual example of what they will see
  // once they really start using randomizer.  This data will no longer render once two or more days of
  // graph_data have been collected.
  make_graph_data = () => {
    if (this.props.location.state.class.graph_data.length === 0) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      var months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];
      var years = (mm = months[mm - 1]);
      yyyy = (yyyy + "").slice(2);

      today = dd + "-" + mm + "-" + yyyy;

      const fake_data = [
        { x: dd - 8 + "-" + mm + "-" + yyyy, y: 90 },
        { x: dd - 7 + "-" + mm + "-" + yyyy, y: 40 },
        { x: dd - 6 + "-" + mm + "-" + yyyy, y: 50 },
        { x: dd - 5 + "-" + mm + "-" + yyyy, y: 95 },
        { x: dd - 4 + "-" + mm + "-" + yyyy, y: 78 },
        { x: dd - 3 + "-" + mm + "-" + yyyy, y: 56 },
        { x: dd - 2 + "-" + mm + "-" + yyyy, y: 97 },
        { x: dd - 1 + "-" + mm + "-" + yyyy, y: 85 }
      ];
      return fake_data;
    } else {
      return this.props.location.state.class.graph_data;
    }
  };

  // This method updates this.state.graph_data with current this.state.participation_rate AND
  // clears the call_record:
  date_format = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    var years = (mm = months[mm - 1]);
    yyyy = (yyyy + "").slice(2);

    // if (dd < 10) {
    //   dd = "0" + dd;
    // }

    // if (mm < 10) {
    //   mm = "0" + mm;
    // }

    today = dd + "-" + mm + "-" + yyyy;

    // If there already exists a this.state.graph_data point with today's date,
    // then you do not want to create a NEW data point, but just update the
    // value of participation for that point, by averaging it with the current
    // this.state.participation_rate.  Otherwise, a new point is created with
    // today's date, and this.state.participation_rate.
    if (this.state.graph_data[this.state.graph_data.length - 1].x === today) {
      console.log("SAME DAY!!!!");
      this.recalculate_participation_rate();
    } else if (
      this.state.graph_data[this.state.graph_data.length - 1].x !== today
    ) {
      const new_graph_data = this.state.graph_data;
      new_graph_data.push({
        x: today,
        y: Math.floor(this.state.participation_rate)
      });
      this.setState({
        call_record: [],
        graph_data: new_graph_data
      });
    }
    console.log("this.state.graph_data", this.state.graph_data);
  };

  // ============================================== RENDER FUNCTION - START =============================================== //
  // ====================================================================================================================== //

  render() {
    // =========== trackState + allState Conditionals - START========== //

    let trackState;
    let allState;

    console.log("STATE at top of render", this.state);

    // ======== #1 - track TRUE all TRUE ======== //
    if (this.state.trackMode == true && this.state.allMode === true) {
      // The conditional below deactivated the Participated and Declined buttons by
      // removing the onClick methods when the deck is empty.
      // if (this.state.allstudents.length > 0) {
        trackState = (

          <div className="caro_container caro_container_tt">
            <div className="caros_tt"> 
              <Button
                className="participated"
                id="Participated-button_tt"
                onClick={this.participatedHandler}
              >
                {""}
                Participated
                {""}
              </Button>
              <Button id="Declined-button_tt" onClick={this.declinedHandler}>
                {" "}
                Declined{" "}
              </Button>
            </div>

          <div>
            {/* <div className="reset"> */}
              <Button
                className="reset_border"
                id="AllGo-button_tt"
                onClick={this.shuffle_allstudents}
              >
                Reset 'All Go'
              </Button>
              <div className="allgo-tracker_tt">
                Students in Deck:
                <br />
                <div className="allgo-tracker-num">
                  {this.state.allstudents.length}
                </div>
              </div>
            {/* </div> */}
          </div>

          </div>

        );
   
        
      // } 
      // else if (this.state.allstudents.length <= 0) {
      //   trackState = (
      //     <div className="caro_container caro_container_tt">
      //       <div className="caros">
      //         <Button
      //           className="participated"
      //           id="Rando-top-button"
      //           style={{ backgroundColor: "rgba(87,68,114,0.2)" }}
      //         >
      //           {""}
      //           Participated
      //           {""}
      //         </Button>
      //         <Button
      //           id="declined"
      //           style={{ backgroundColor: "rgba(87,68,114,0.2)" }}
      //         >
      //           {" "}
      //           Declined{" "}
      //         </Button>
      //       </div>
      //     </div>
      //   );
      // }
    }
    // ======== #2 - track TRUE all FALSE ======== //

    if (this.state.trackMode == true && this.state.allMode === false) {
      trackState = (
        <div className="middle_container_t">
          <div className="middle_t">
            <Button id="participated_t" onClick={this.participatedHandler}>
              {""}
              Participated
              {""}
            </Button>
            <Button id="declined_t" onClick={this.declinedHandler}>
              {" "}
              Declined{" "}
            </Button>
          </div>
        </div>
      );
    }

    // ======== #3 - track FALSE all TRUE ======== //
    if (this.state.trackMode === false && this.state.allMode == true) {
      if (this.state.allstudents.length > 0) {
        trackState = (
          <div className="middle_container_a">
            <div className="middle_a">
              <div className="middle_a_left_container">
                <div className="middle_a_left">
                  <Button id="reset_a" onClick={this.shuffle_allstudents}>
                    Reset 'All Go'
                  </Button>

                  <div className="allgo-tracker_a">
                    Students in Deck
              
                    <div className="allgo-tracker-num_a">
                      {this.state.allstudents.length}
                    </div>
                  </div>
                </div>
              </div>
              <Button id="Randomize-button_a" onClick={this.allGoHandler}>
                {" "}
                RANDOMIZE!{" "}
              </Button>
            </div>
          </div>
        );
      } else if (this.state.allstudents.length === 0) {
        console.log("HERE!!!");
        trackState = (
          <div className="middle_container_a">
            <div className="middle_a">
              <div className="middle_a_left_container">
                <div className="middle_a_left">
                  <Button id="reset_a" onClick={this.shuffle_allstudents}>
                    Reset 'All Go'
                  </Button>

                  <div className="allgo-tracker_a">
                    Students in Deck
              
                    <div className="allgo-tracker-num_a">
                      {this.state.allstudents.length}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                id="Randomize-button_a"
                style={{ backgroundColor: "rgba(87,68,114,0.2)" }}
              >
                {" "}
                RANDOMIZE!{" "}
              </Button>
            </div>
          </div>
        );
      }
    }

    // ======== #4 - track FALSE all FALSE ======== //

    if (this.state.trackMode === false && this.state.allMode == false) {
      trackState = (
        <div className="middle_container_none">
          <div className="middle_none">
            {/* <div className="middle_none_left">
                <Button
                  id="reset_none"
                  onClick={this.shuffle_allstudents}
                >
                  Reset 'All Go'
                </Button>
                <div className="allgo-tracker_none">
                  Students in Deck
            
                  <div className="allgo-tracker-num_none">
                    {this.state.allstudents.length}
                  </div>
                </div>
              </div> */}
            <Button id="Randomize-button_none" onClick={this.randomHandler}>
              {" "}
              RANDOMIZE!{" "}
            </Button>
          </div>
        </div>
      );
    }
    // =========== trackState + allState Conditionals - END ========== //
    console.log("WINDOW_WIDTH:", document.documentElement.clientWidth);
    return (
      <div className="main">
        <div className="main_contents">
          <div className="top-section">
            <div className="classid_container_tt">
              <div className="classid_tt">{this.state.class.name}</div>
            </div>

            <div className="header tt_header">
              {this.state.allMode === true ? (
                <div className="header_container tt_header_container">
                  <div className="studentName">
                    {this.state.current_student.first_name}{" "}
                    {this.state.current_student.last_name}
                  </div>
                  <div className="on_deck_tt">
                    On Deck:   {this.state.on_deck_student.first_name}{" "}
                    {this.state.on_deck_student.last_name}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="studentName">
                    {this.state .current_student.first_name}{" "}
                    {this.state.current_student.last_name}
                  </div>
                  <div className="on_deck">
                    On Deck: {this.state.on_deck_student.first_name}{" "}
                    {this.state.on_deck_student.last_name}
                  </div>
                </div>
              )}
            </div>
            <div className="edit_container edit_container_tt">
              <Link
                to={{
                  pathname: `/${this.state.classid}/edit`,
                  state: {
                    // classid: classitem._id,
                    class: this.state.class
                  }
                }}
              >
                <Button
                  className="edit"
                  id="Rando-top-button_edit"
                  // href={`/${this.state.classid}/edit`}
                >
                  {" "}
                  Edit{" "}
                </Button>
              </Link>
            </div>

            <Link
              className="edit_container"
              to={{
                pathname: `/${this.state.classid}/edit`,
                state: {
                  // classid: classitem._id,
                  class: this.state.class
                }
              }}
            >
              <Button id="edit"> Edit </Button>
            </Link>
          </div>

          {trackState}
          {/* {allState} */}

          {this.state.trackMode == true ? (
            <div className="part_data">
              <div className="part_data_title">
                {/* Overall Class Participation Ra ↓{" "} */}
                <div className="line_chart">
                  <LineChart
                    // xDomainRange={[0, 100]}
                    id="LineChart"
                    yDomainRange={[0, 100]}
                    xType={"time"}
                    dataPoints
                    axes={this.state.axes}
                    grid
                    verticalGrid
                    // interpolate={"cardinal"}
                    lineColors={["pink", "purple"]}
                    className={"line-chart_track-only"}
                    width={this.state.width}
                    height={this.state.height}
                    data={[this.state.graph_data]}
                    style={{
                      stroke: "white",

                      backgroundColor: "#332259"
                    }}
                  />
                </div>
              </div>
              {/* <div className="part_graph">{this.participationTracker()}</div> */}
            </div>
          ) : (
            <div className="part_data part_data_off">
              <div className="part_data_title part_data_title_off" />
              <div className="part_graph part_graph_off" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classes,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getClasses, updateParticipation, updateGraphData }
)(MagicRandomizer);

// export default MagicRandomizer;
