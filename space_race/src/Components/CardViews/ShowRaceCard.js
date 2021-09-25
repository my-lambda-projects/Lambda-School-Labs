import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRaces } from '../../Actions/showRaces'
import { Input, Label, Card, Col, CardText, Button, Row, CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './ShowRaceCard.css'


class ShowRaceCard extends Component {
  // On page load get all of the races for the user out of the database.
  componentDidMount() {
    this.props.getRaces();
  }
  render() {
    return (
      <div>
        {this.props.gotRaces ?
        <Row>
          {this.props.races.map(race => {
               return <Col sm="4" key={race.id}>
               <Card body>
                 <CardTitle>{race.name}</CardTitle>
                 <CardText>Teams: {race.teams.length}</CardText>
                 <CardText>Questions: {race.questions.length}</CardText>
                 <Button>Finish Setting Up Race</Button>
               </Card>
             </Col>
            })}
        </Row>
      : null}
      </div>
      // <div>
      //   <meta charSet="utf-8" />
      //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //   <title>show race card</title>
      
      //   <header />
      //   <div className="container"><input className="form-control-lg d-inline-flex justify-content-center align-self-center ml-auto" type="text" name="title" defaultValue="SCHEDULED RACES" /></div>
      //   <div className="card-group d-block m-auto">
      //     <div className="card"><img className="card-img-top w-100 d-block" />
      //       <div className="card-body">
      //         <h4 className="card-title">race name 1</h4>
      //         <div className="table-responsive">
      //           <table className="table">
      //             <thead>
      //               <tr>
      //                 <th>teams</th>
      //                 <th />
      //               </tr>
      //             </thead>
      //             <tbody>
      //               <tr>
      //                 <td>team 1</td>
      //                 <td />
      //               </tr>
      //               <tr>
      //                 <td>...team4</td>
      //                 <td />
      //               </tr>
      //             </tbody>
      //           </table>
      //         </div>
      //         <p className="card-text">random info&nbsp;</p><button className="btn btn-primary" type="button">click to edit</button></div>
      //     </div>
      //     <div className="card"><img className="card-img-top w-100 d-block" />
      //       <div className="card-body">
      //         <h4 className="card-title">race name 2</h4>
      //         <div className="table-responsive">
      //           <table className="table">
      //             <thead>
      //               <tr>
      //                 <th>teams</th>
      //                 <th />
      //               </tr>
      //             </thead>
      //             <tbody>
      //               <tr>
      //                 <td>team 1</td>
      //                 <td />
      //               </tr>
      //               <tr>
      //                 <td>...team4</td>
      //                 <td />
      //               </tr>
      //             </tbody>
      //           </table>
      //         </div>
      //         <p className="card-text">random info&nbsp;</p><button className="btn btn-primary" type="button">click to edit</button></div>
      //     </div>
      //     <div className="card"><img className="card-img-top w-100 d-block" />
      //       <div className="card-body">
      //         <h4 className="card-title">race name 3</h4>
      //         <div className="table-responsive">
      //           <table className="table">
      //             <thead>
      //               <tr>
      //                 <th>teams</th>
      //                 <th />
      //               </tr>
      //             </thead>
      //             <tbody>
      //               <tr>
      //                 <td>team 1</td>
      //                 <td />
      //               </tr>
      //               <tr>
      //                 <td>...team4</td>
      //                 <td />
      //               </tr>
      //             </tbody>
      //           </table>
      //         </div>
      //         <p className="card-text">random info&nbsp;</p><button className="btn btn-primary" type="button">click to edit</button></div>
      //     </div>
      //   </div>
      // </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    races: state.Races.races,
    gotRaces: state.Races.gotRaces
  }
}

export default connect(mapStateToProps, { getRaces })(ShowRaceCard)