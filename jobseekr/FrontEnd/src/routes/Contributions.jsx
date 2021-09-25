import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Header } from '../components/AllComponents';
import axios from 'axios';
import ROOT_URL from './config';
import 'react-datepicker/dist/react-datepicker.css'; 

class Contributions extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dateOfContribution: moment(),
      contributionName: '',
      linkToContribution: '',
      notes: '',
      token: localStorage.getItem('token'),
      contributions: [],
    };
  }
  componentDidMount() {
    this.getContributions();
  }


  getContributions = () => {
    const token = this.state.token;
    axios.get(`${ROOT_URL}/contributions`,
    {
      headers: {
        token
      }
    })
    .then(response => {
      const gotContributions = response.data
      // added to sort the contributions by date.
        .sort((a, b) => a.dateOfContribution > b.dateOfContribution);
      // added to turn links to absolute urls
      gotContributions.map(contrib => {
        let test1 = contrib.linkToContribution.substring(0,7);
        if (test1 !== "http://") {
            if (test1.match(/\//) && !test1.match(/:/)) {
              contrib.linkToContribution = contrib.linkToContribution.replace(/\/\//, "://")
            }
            if (!test1.match(/http/i)) {
              contrib.linkToContribution = "http://" + contrib.linkToContribution;
            }
            if (test1.match(/:\//) && !test1.match(/\/\//)) {
              contrib.linkToContribution = contrib.linkToContribution.replace(/:\//, "://")
            }
          } 
        return contrib;
      });
      this.setState({ contributions: gotContributions });
    })
    .catch(err => console.log(err));
  }

  destroyContribution = (e, id) => {
    e.preventDefault();
    let data = { id }
    axios.delete(`${ROOT_URL}/contributions`, { data })
    .then(() => {
      this.getContributions();
    })
    .catch(err => console.log(err));
  }

  handleDateChange = (date) => {
    this.setState({
      dateOfContribution: date
    });
  }
  

  handleCreateContribution = e => {
    e.preventDefault();
    let body = { ...this.state };
    axios
      .post(`${ROOT_URL}/contributions`, {
        dateOfContribution: body.dateOfContribution.format(),
        contributionName: body.contributionName,
        linkToContribution: body.linkToContribution,
        notes: body.notes,
        token: body.token,
      })
      .then(() => {
        this.getContributions();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  render() {
    return (
      <div className="parent">
        <Header />
        <div className="ContributionsWrapper">
          <h1>Contributions</h1>
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Contribution | Link</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
            {this.state.contributions.length > 0 ? this.state.contributions.map((contrib) => {
              const id = contrib._id;
              return (
                  <tr key={id}>
                    <th scope="row">{contrib.dateOfContribution.substring(0,10)}</th>
                    <td>
                      {contrib.contributionName}
                      <Button bsSize="small" className="contributions--btn">
                        <a href={contrib.linkToContribution} target="blank">
                          <Glyphicon glyph="link" />
                        </a>
                      </Button>
                    </td>
                    <td>{contrib.notes}</td>
                    <td>
                      <Button 
                        bsStyle="primary"
                        className="contributions--btn"
                        onClick={e => this.destroyContribution(e, id)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                )
              }) : null}
              </tbody>
            </table>
          <form>
            <div className="form-row">
              <div className="form-col">
                <Glyphicon glyph="calendar" /> &nbsp;
                <DatePicker
                  className="form-control"
                  selected={this.state.dateOfContribution}
                  onChange={this.handleDateChange}
                />
              </div>
              <div className="form-col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contribution"
                  onChange={e => this.setState({ contributionName: e.target.value })}
                /> &nbsp;
                <input 
                  type="text"
                  className="form-control" 
                  placeholder="Link" 
                  onChange={e => this.setState({ linkToContribution: e.target.value })}
                />
              </div>
              <div className="form-col">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Notes" 
                  onChange={e => this.setState({ notes: e.target.value })}
                />
                <Button 
                  bsStyle="primary"
                  onClick={e => this.handleCreateContribution(e)}
                  className="contributions--btn"
                >
                  <Glyphicon glyph="plus" className="contributions--btn__plus"/>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contributions;
