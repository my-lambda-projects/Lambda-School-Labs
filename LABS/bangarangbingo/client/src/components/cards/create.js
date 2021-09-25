import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout';
import PDFViewer from '../bingo/pdf';


class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'bingo card title',
    };
  }
  handleChange(e, field) {
    this.setState({
      [field]: e.target.value,
    });
  }
  render() {
    const { props } = this;
    return (
      <Layout logout={props.logout}>
        <div className="root">
          <header>
            <h1>Customize Your Cards</h1>
          </header>
          <section className="content">
            <section className="card-area">
              <span className="card-input-title">Name Your Deck</span>
              <input type="text" name="cardname" value={this.state.name} onChange={event => this.handleChange(event, 'name')} />
              <PDFViewer cardname={this.state.name} />
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
        label {
          display: none;
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

export default CreateCard;
