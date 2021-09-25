import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initOrder } from '../../actions/billing';
import { push } from 'react-router-redux';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://www.bangarangbingo.com' : 'http://localhost:3000';

class PDFViewer extends Component {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage);
  }
  componentDidUpdate() {
    console.log('update: ', this.props);
    if (this.props.cardToEdit) {
      const iframe = document.getElementById("PDFViewer");
      iframe.onload = (event) => {
        iframe.contentWindow.postMessage(this.props.cardToEdit, '*');
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }
  handleMessage(e) {
    const origin = e.origin;
    const message = e.data;
    const { source } = message;
    if (source === 'pdf-design' && origin === ROOT_URL) {
      const { card } = message;
      const { cardname: name } = this.props;
      console.log('we have a name: ', name);
      this.props.initOrder(name, card);
    }
  }
  render() {
    return <iframe id="PDFViewer" src={`${ROOT_URL}/pdf-design.html`} title="card" width="100%" height="1000px" />;
  }
}

const mapStateToProps = state => ({
  bingoCard: state.card,
});

export default connect(mapStateToProps, { initOrder })(PDFViewer);
