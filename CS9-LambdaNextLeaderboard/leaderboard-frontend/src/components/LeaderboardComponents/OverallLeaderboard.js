import React, { Component } from "react";
import { Container, Header, Image, Table } from "semantic-ui-react";

// const colors = [
//   "red",
//   "orange",
//   "yellow",
//   "olive",
//   "green",
//   "teal",
//   "blue",
//   "violet",
//   "purple",
//   "pink",
//   "brown",
//   "grey",
//   "black"
// ];

class OverallLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //     { name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },
      //     { name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
      //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
      //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },{ name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
      //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
      //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },{ name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
      //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
      //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },{ name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
      //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
      //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },{ name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
      //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
      //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },
      // ]
    };
  }
  render() {
    return (
      <div>
        <Container>
          <Table color={"grey"} celled inverted selectable>
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
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="https://avatars3.githubusercontent.com/u/12102923?s=460&v=4"
                      rounded
                      size="mini"
                    />
                    <Header.Content>Claudio Gonzalez</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>47</Table.Cell>
                <Table.Cell>31</Table.Cell>
                <Table.Cell>78</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="https://avatars2.githubusercontent.com/u/115880?s=400&u=ac3673f7e699efa57bf31c66afb2123ce1689b41&v=4"
                      rounded
                      size="mini"
                    />
                    <Header.Content>Eric Andrade</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>44</Table.Cell>
                <Table.Cell>34</Table.Cell>
                <Table.Cell>78</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="https://avatars3.githubusercontent.com/u/7462727?s=460&v=4"
                      rounded
                      size="mini"
                    />
                    <Header.Content>Aaron Faulkner</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>50</Table.Cell>
                <Table.Cell>28</Table.Cell>
                <Table.Cell>78</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="https://avatars0.githubusercontent.com/u/36025407?s=460&v=4"
                      rounded
                      size="mini"
                    />
                    <Header.Content>Shawn Stewart</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>46</Table.Cell>
                <Table.Cell>32</Table.Cell>
                <Table.Cell>78</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image
                      src="https://avatars3.githubusercontent.com/u/35821558?s=460&v=4"
                      rounded
                      size="mini"
                    />
                    <Header.Content>Abraham Bueno</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>44</Table.Cell>
                <Table.Cell>34</Table.Cell>
                <Table.Cell>78</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

export default OverallLeaderboard;
