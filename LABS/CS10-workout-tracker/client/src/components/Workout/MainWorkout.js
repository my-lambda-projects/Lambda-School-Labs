import React from "react";
import RoutineList from "./RoutineList";
import WorkoutForm from "./WorkoutForm";
import CurrentRoutine from "./CurrentRoutine";
import { TweenLite } from "gsap";

class MainWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.myTween = null;
    this.animateWorkout = null;
  }

  componentDidMount(){
    // use the node ref to create the animation
    this.myTween = TweenLite.from(this.animateWorkout, 1, { y: 100, opacity: 0 });
  }

  render() {
    return (
      <div className="main__workout" ref={div => this.animateWorkout = div}>
        <RoutineList />
        <WorkoutForm />
        <CurrentRoutine />
      </div>
    );
  }
}

export default MainWorkout;
