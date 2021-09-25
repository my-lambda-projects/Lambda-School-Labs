import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { getCard } from '../../actions';
import Layout from '../layout';
import PDFViewer from '../bingo/pdf';
import axios from 'axios';
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://www.bangarangbingo.com' : 'http://localhost:8080';

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
      name: '',
    };
  }
  componentDidMount() {
    this.setCard(this.props.match.params.id);
    console.log('this got called');    
  }
  async setCard(id) {
    try {
      const authToken = window.localStorage.getItem('token');
      const { data } = await axios.get(`${ROOT_URL}/card/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { card, title } = data;
      // we have card, now we have to set the card to edit;
      console.log('set card: ', title);
      this.setState({ card, name: title }, (test) => {
        console.log('after', test);
      });
    } catch (e) {
      console.log('set card: ', e);
    }
  }
  handleChange(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }
  render() {
    const { props } = this;
    const { card } = this.state;
    console.log('render with: ', card);
    return (
      <Layout logout={props.logout}>
        <div className="root">
          <header>
            <h1>Edit Your Cards</h1>
          </header>
          <section className="content">
            <section className="card-area">
            <input type="text" name="cardname" value={this.state.name} onChange={event => this.handleChange(event, 'name')} />
              <PDFViewer cardToEdit={this.state.card} cardname={this.state.name} />
            </section>
          </section>
        </div>
        <style jsx scoped>
          {`
        .root {
          max-width: 1440px;
          margin: 0 auto;
          padding: 20px;
        }
        input {
          background-color: white;
          height: 40px;
          border-radius: 4px;
          border: 1px solid transparent;
          box-shadow: 0 1px 3px 0 #0000003b;
          transition: box-shadow 150ms ease;
          margin-bottom: 20px;
          margin-right: 20px;
          outline: none;
          font-size: 14px;
          padding: 0 15px 0 10px;
        }
        input:focus {
          box-shadow: 0 1px 3px 0 #cfd7df;
        }
        .card-area {
          background: #249999;
          padding: 20px;
        }
        .card-input-title {
          display: block;
          color: #232121;
          padding: 10px 0;
        }
        `}
        </style>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
    cardToEdit: state.card,
  });

export default withRouter(connect(mapStateToProps, { getCard })(EditCard));
