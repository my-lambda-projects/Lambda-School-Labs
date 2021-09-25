import React from 'react';
import { Image, Carousel } from 'react-bootstrap';
import Slide1 from '../Images/addjob.png';
import Slide2 from '../Images/meetups.png';
import Slide3 from '../Images/contributions.png';


const AppDescription = () =>
  (
    <div className="AppDescriptionWrapper">
      <div className="ad__header">
        <div className="ad-3">
          <strong>
          What Jobseekr does:
          </strong>
        </div>
      </div>
      <div className="carousel__wrapper">
        <Carousel className="ad__carousel">
          <Carousel.Item>
            <Image width={900} height={500} alt="900x500" src={Slide1} />
            <Carousel.Caption className="carousel-txt">
              <h3>Add Jobs to Your Wish List</h3>
              <p>Keep track of which stage of the job seeking process for each job.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image width={900} height={500} alt="900x500" src={Slide2} />
            <Carousel.Caption className="carousel-txt">
              <h3>Network</h3>
              <p>Keep track of your meetups with dates and links to information about the meetup.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image width={900} height={500} alt="900x500" src={Slide3} />
            <Carousel.Caption className="carousel-txt">
              <h3>Be Seen</h3>
              <p>Keep track of social media and project contributions to the industry.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
export default AppDescription;
