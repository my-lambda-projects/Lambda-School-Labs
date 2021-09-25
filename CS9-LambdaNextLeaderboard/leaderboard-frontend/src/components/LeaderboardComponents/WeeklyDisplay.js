import React, { Component } from "react";
// import {Header, Image} from "semantic-ui-react";
import { Header, Image, Table } from "semantic-ui-react";

class WeeklyDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      huntrDefault: 32
    };
  }

  render() {
    console.log(this.props.count, typeof this.props.count);
    return (
      <div >
        {/*<Table.Body >*/}
          {/*<Table.Row colSpan="4" style={{width: "100%"}}>*/}
            <Table.Cell colSpan="2">
              <Header as="h4" image>
                <Image
                  src="https://avatars3.githubusercontent.com/u/35821558?s=460&v=4"
                  rounded
                  size="mini"
                />
                <Header.Content >{this.props.github.FullName}</Header.Content>
              </Header>
            </Table.Cell >
            <Table.Cell >{this.props.github.commitsByUser}</Table.Cell>
            <Table.Cell >
              {this.props.count === "none"
                ? this.state.huntrDefault
                : this.props.count}
            </Table.Cell>
            <Table.Cell >
              {this.props.count === "none"
                ? this.state.huntrDefault + this.props.github.commitsByUser
                : this.props.count + this.props.github.commitsByUser}
            </Table.Cell>
          {/*</Table.Row>*/}
        {/*// </Table.Body>*/}
      </div>
    );
  }
}

export default WeeklyDisplay;
