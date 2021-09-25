import React from "react";
import { UncontrolledCarousel } from 'reactstrap';
//import picture from '../assets/Images/insta.jpg';

const items = [
  {
    src:
      "insta.png",
    altText: "Slide 1",
    caption: "",
    header: ""
  },
  {
    src:
      "insta2.png",
    altText: "Slide 2",
    caption: "",
    header: ""
  },
  {
    src:
      "insta3.png",
    altText: "Slide 3",
    caption: "",
    header: ""
  }
];

const OtherCarousel = () => <UncontrolledCarousel items={items} />;

export default OtherCarousel;
