import React, { Component } from "react";
import { Checkbox } from 'semantic-ui-react'
import '../../styles/slider.scss'

class Slider extends Component {
  constructor(props) {
    super(props);
  }
  render(){  
    return ( 
  <div>
    <div className="range">
  <input type="range" min="1" max="4" steps="1" value="1"></input>
</div> 
<ul class="range-labels">
  <li class="active selected">Wishlist</li>
  <li>Transited</li>
  <li>Visited</li>
  <li>Lived</li>
</ul>
</div>
    );
  }
}

export default Slider;
