//These imports are mandatory for all components created under ./subComponents
//If these aren't imported, than it'll break, as you're usin React, and SplitPane
// import { SplitPane } from "../../index";
import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {getGithubDataAction} from '../../actions'
import {connect} from 'react-redux'
import "./index.css";

import MenuBar from "../MenuBar/MenuBar";

import ClassList from "./ClassList";
import {mapStateToProps} from "../CreateOrEditClass/StudentsDisplay";

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}

//Left Component
function LeftContent() {
  return (
    <div className="LeftContent" style={{ height: "100%" }}>
      <MenuBar />
    </div>
  );
}

//Right Component
function RightContent(props) {
  return (
    <div className="RightContent" style={{ height: "100%" }}>
      <ClassList props={props} />
    </div>
  );
}

//These styles can go into a CSS file, such as HomeTemplate.css
//I did them this way because it's faster
class ClassList2 extends React.Component{
    componentDidMount() {
        this.props.getGithubDataAction();
    }

    render() {
        return (
            <div style={{ height: "100%" }}>
                {/*<NavBar props={props} />*/}
                <Breadcrumb size="large" style={{ height: "3%", marginLeft: "1%" }}>
                    <Breadcrumb.Section>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />

                    <Breadcrumb.Section active>Classes</Breadcrumb.Section>
                </Breadcrumb>

                <SplitPane
                    left={<LeftContent />}
                    right={<RightContent props={this.props} />}
                />
            </div>
        );
    }

}

export default connect(mapStateToProps, {getGithubDataAction})(ClassList2);
