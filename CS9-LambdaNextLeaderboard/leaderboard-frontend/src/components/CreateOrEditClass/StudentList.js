import React, {Component} from "react";
// import {connect} from "react-redux";
import {connectAsync} from "iguazu";
import {queryMyData, queryStudents} from "../../actions";


import "./StudentList.css";
import StudentsDisplay from "./StudentsDisplay";


class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    componentDidMount() {
        if (localStorage.getItem("invalid")) {
            localStorage.removeItem("token");
            this.props.props.props.history.push('/')
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (localStorage.getItem("invalid")) {
            localStorage.removeItem("token");
            this.props.props.props.history.push('/')
        }
    }


    render() {
        if (this.props.isLoading()) {
            return <div>Loading...</div>;
        }

        if (this.props.loadedWithErrors()) {
            return <div>Oh no! Something went wrong</div>;
        }
        console.log(this.props.props.props.match.params.name)
        let count = 0;
        const students = []
        this.props.students.map((each, i) => {
            // return each
            if (each.classname === this.props.props.props.match.params.name) {
                count++
                console.log('each', each, i, count)
                students.push(each)
                // return each
                return false;
            }
            return false;
        })
        console.log("student length", students)
        if (students[0]) {
            return (
                <div className="main">
                    <h5 style={{marginLeft: "1%"}}>StudentList</h5>

                    {students.map((student_data, i) => {
                        return (
                            <StudentsDisplay
                                key={student_data + i}
                                student={student_data}
                                class={this.props.myData.className}
                            />
                        );
                    })}
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>No Students</h1>
                </div>
            )
        }

    }
}


function loadDataAsProps({store, ownProps}) {
    const {dispatch} = store;

    // console.log('ownProps', ownProps.props.props.match.path)
    let path = ownProps.props.props.match.params.name

    console.log('path', path);
    return {
        students: () => dispatch(queryStudents(path)),
        myData: () => dispatch(queryMyData(path))
    };
}

export default connectAsync({loadDataAsProps})(StudentList);
