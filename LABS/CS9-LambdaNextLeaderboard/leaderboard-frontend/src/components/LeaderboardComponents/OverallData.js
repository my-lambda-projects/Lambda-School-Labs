import React, {Component} from "react";
import {Container, Header, Image, Table} from "semantic-ui-react";


class OverallData extends Component {
  render() {
    return (
      <div>
        <Container>
          <Table color={"blue"} celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  Overall Leaderboard
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

              return (

                <Table.Row key={each + x}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image
                        src={each.Git.avatar}
                        rounded
                        size="mini"
                      />
                      <Header.Content>{each.Git.FullName} </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {each.Git.commitsByUser + each.Git.pushCount}
                  </Table.Cell>
                  <Table.Cell>
                    {each.Huntr.count === "none"
                      ? this.state.huntrDefault
                      : each.Huntr.count}
                    {/*{this.state.huntrDefault}*/}
                  </Table.Cell>
                  <Table.Cell>
                    {each.Huntr.count === "none"
                      ? this.state.huntrDefault +
                      each.Git.commitsByUser +
                      each.Git.pushCount
                      : each.Huntr.count +
                      each.Git.commitsByUser +
                      each.Git.pushCount}
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

export default OverallData;
