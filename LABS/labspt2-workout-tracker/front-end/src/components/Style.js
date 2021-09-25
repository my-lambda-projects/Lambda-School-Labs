
import React, { Component } from 'react';
import './styles/Style.sass'
class Style extends Component {
    render() {
      return (
        <div className="form-container">
         <h1> 10/06/2019 </h1>
        <form>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
        </form>
        <button>Submit</button>
        <p>170 lb</p>
        <p>Hips: 34 in</p>

        </div>
      );
    }
  }

  export default Style