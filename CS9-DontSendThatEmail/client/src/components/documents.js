import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./documents.css";
import AddLetter from "./addLetter";

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [],
      checkedIds: []
    };
  }
  componentDidMount() {
    this.setLetters();
  }
  setLetters() {
    axios
      .get(`https://dontemail.herokuapp.com/letters`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(resp => {
        this.setState({ letters: resp.data.letters });
      })
      .catch(err => {});
  }

  // Verifies if checkbox is selected. Pushes id into array or filters id out of array based on if true.
  handleChange = (id, e) => {
    const checked = e.target.checked;
    if (checked === true) {
      this.state.checkedIds.push(id);
    } else {
      const filteredArr = this.state.checkedIds.filter(stateId => {
        return stateId !== id;
      });
      this.setState({ checkedIds: filteredArr });
    }
  };
  
  listDocuments() {
    return this.state.letters.map(letter => (
     
      <Fragment>
        
        <div className="letterBox">
        
          <input
            key={letter._id}
            type="checkbox"
            name={this.props.name}
            defaultChecked={this.props.defaultChecked}
            onChange={this.handleChange.bind(this, letter._id)}
          />

          <Link className="tablerow" to={`/dashboard/create/${letter._id}`}>
            <div className="letter-name">{letter.name}</div>
            <time className="time">{this.formatStamp(letter.timestamp)}</time>
          </Link>
          <div className="databox-icons">
            <i
              onClick={() => this.deleteItems(letter._id)}
              className="fa fa-trash"
              aria-hidden="true"
            />
          </div>
        </div>
      </Fragment>
    ));
  }


  formatStamp(timestamp){
    let date = new Date(timestamp)
    return date.toDateString()
    
  }

  // Checks if checked id length is < 0 & if it is, it will delete every letter tied to id

  deleteItems = id => {
    if (this.state.checkedIds.length !== 0) {
      this.state.checkedIds.forEach(checkId => {
        axios
          .delete(`https://dontemail.herokuapp.com/letters/${checkId}`, {
            headers: { Authorization: localStorage.getItem("token") }
          })
          .then(resp => {
            this.setState({ checkedIds: [] });
            this.setLetters();
          })
          .catch(err => {});
      });
    } else {
      axios
        .delete(`https://dontemail.herokuapp.com/letters/${id}`, {
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(resp => {
          this.setState({ checkedIds: [] });
          this.setLetters();
        })
        .catch(err => {});
    }
  };

  render() {
    const { auth } = this.props.context.userData;
    return (
      <Col className="documentsbox" md="10">
        {auth ? (
          <Fragment>
            <Row className="databox">
              <Row className="header-row">
             
                <div className="header-text">
            
                  
                 
                 

                  <div className="textstuff">
                  <AddLetter {...this.props} />
                   <i
                    onClick={() => this.deleteItems()}
                    className="fa fa-trash"
                    aria-hidden="true"
                  />
                  Subject</div>
                  <div className="textstuff">Created at</div>
                  
                </div>
                >
              </Row>
              <Row className="listsofdocuments">{this.listDocuments()}</Row>
            </Row>
           
          </Fragment>
        ) : (
          this.props.history.push("/")
        )}
      </Col>
    );
  }
}

export default Documents;
