import React, { Component } from 'react';
import {
  Jumbotron,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
  CarouselIndicators,
  Container,
  Button
} from 'reactstrap';
import styled from 'styled-components';
import pic from '../../assets/river_mountain.jpg';
import invoicePic from '../../assets/hosted-invoice-page.png';

import TopBar from '../TopBar/TopBar';

class LandingPage extends Component {
  render() {
    return (
      <StyledHome>
        <TopBar />
        <StyledJumbotron>
          <Container>
            <CarouselExample />
            <Blurb>
              Track your billable hours to make sure you make them duccets.
            </Blurb>
          </Container>
        </StyledJumbotron>
        <Button>Buy Now</Button>
      </StyledHome>
    );
  }
}

const StyledJumbotron = styled(Jumbotron)`
  ${'' /* background-image: url(${pic});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 70vh; */};
  background: none;
  background-color: transparent !important;
`;

const StyledHome = styled.div`
  background-image: url(${pic});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 95vh;
`;

const Blurb = styled.h3`
  color: white;
`;

const items = [
  {
    src: invoicePic,
    captionText: 'invoicePic',
    altText: 'Slide 1'
  },
  {
    src: invoicePic,
    captionText: 'invoicePic',
    altText: 'Slide 2'
  },
  {
    src: invoicePic,
    captionText: 'invoicePic',
    altText: 'Slide 3'
  }
];

class CarouselExample extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item, i) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={i}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.captionText} />
        </CarouselItem>
      );
    });

    return (
      <StyledCarousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </StyledCarousel>
    );
  }
}

const StyledCarousel = styled(Carousel)`
  img {
    width: 50%;
    height: auto;
  }
`;

export default LandingPage;
