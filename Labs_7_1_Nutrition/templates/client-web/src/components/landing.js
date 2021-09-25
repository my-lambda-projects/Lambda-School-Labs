import React from 'react';
import ImageContainer from '../containers/imageContainer.js';
import { Menu } from 'antd';


class Landing extends React.Component {
   constructor() {
       super();
       this.state = {
           username: '',
           token: '',
       }
   }
    render() {
        // localStorage.setItem('username',this.state.username);
        return (
            <div >
                <ImageContainer />  
            </div>
        )
    }
}
export default Landing;