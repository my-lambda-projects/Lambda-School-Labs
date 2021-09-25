import React, { Component } from 'react';
import Layout from '../layout';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { initDownload } from '../../actions/card';

class Downloads extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.initDownload(id);
    }
  }
  render() {
    return (
      <Layout>
        <div className="root">
          <header>
            <h1>Download Your Cards</h1>
          </header>
          <section className="content">
            <section className="card-area">
              <span>You cards are generating</span>
            </section>
          </section>
        </div>
        <style jsx scoped>
          {`
            .root {
              text-align: center;
            }
          `}
        </style>
      </Layout>
    );
  }
}

export default withRouter(connect(null, { initDownload })(Downloads));
