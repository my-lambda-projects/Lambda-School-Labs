
import React, { Component } from 'react';
// import { render } from 'react-dom';

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
  }

  //allows the React application to load in first to ensure that the google maps API works fine

  componentDidMount() {
    if (!window.google) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      //note: this part here is the google API key, please replace as needed
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyDUwSdMdxb22hcjJE3eJ6qycHz8aofkY0k`;
      const tagname = document.getElementsByTagName('script')[0];
      tagname.parentNode.insertBefore(script, tagname);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      script.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: 500, height: 500 }} id={this.props.id} />
    );
  }
}

export default Map;
