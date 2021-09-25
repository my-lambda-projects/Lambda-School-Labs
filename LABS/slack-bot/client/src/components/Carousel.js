import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';
import testPic from './img/giphy.gif';
import testPic2 from './img/giphy2.gif';
import testPic3 from './img/giphy3.gif';

class HomePageCarousel extends Component {
  render() {
    return (
    <div >
      <h2>This is an important step for SlackBot Kind</h2>
      <div></div>
      <Carousel>
        <Carousel.Item>
          <img width='100%' height={500} alt="900x500" src={testPic} />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>We are going to be testing these a lot</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width='100%' height={500} alt="900x500" src={testPic2} />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>The most important thing to Slackbots is clear endpoints</p>
          </Carousel.Caption>
        </Carousel.Item> 
        <Carousel.Item>
          <img width='100%' height={500} alt="900x500" src={testPic3} />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Carpe Diem</p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
      

    </div>

  );
  }
}

export default HomePageCarousel;