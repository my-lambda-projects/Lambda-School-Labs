import React, { Component } from "react";
import { Container, Table, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { classRanking } from "../../actions/classActions";

class WeeklyData extends Component {
  render() {
    let first = {
      score: 0,
      name: ""
    };
    let second = {
      score: 0,
      name: ""
    };
    return (
      <div>
        <Container>
          <Table color={"teal"} celled inverted sortable selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  Weekly Leaderboard
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Github</Table.HeaderCell>
                <Table.HeaderCell>Huntr</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.props.data.map((each, x) => {
              if (x === 0) {
                first.score = each.Huntr.count + each.Git.commitsByUser;
                first.name = each.Git.FullName;
              }
              if (
                x !== 0 &&
                each.Huntr.count + each.Git.commitsByUser > first.score
              ) {
                second.score = first.score;
                second.name = first.name;
                first.score = each.Huntr.count + each.Git.commitsByUser;
                first.name = each.Git.FullName;
              } else if (
                x !== 0 &&
                each.Huntr.count + each.Git.commitsByUser > second.score
              ) {
                second.score = each.Huntr.count + each.Git.commitsByUser;
                second.name = each.Git.FullName;
              } else {
              }
              if (x === this.props.data.length - 1) {
                this.props.classRanking(
                  first.score,
                  second.score,
                  first.name,
                  second.name
                );
              }
              return (
                <Table.Row key={each + x}>
                  {/* // <WeeklyDisplay github={each.Git} count={each.Huntr.count} huntr={each.Huntr} /> */}
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image src={each.Git.avatar} rounded size="mini" />
                      <Header.Content>{each.Git.FullName}</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{each.Git.commitsByUser}</Table.Cell>
                  <Table.Cell>{each.Huntr.count}</Table.Cell>
                  <Table.Cell>
                    {each.Huntr.count + Number(each.Git.commitsByUser)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    first: state.first,
    second: state.second,
    firstScore: state.firstScore,
    secondScore: state.secondScore
  };
};

export default connect(
  mapStateToProps,
  { classRanking }
)(WeeklyData);
