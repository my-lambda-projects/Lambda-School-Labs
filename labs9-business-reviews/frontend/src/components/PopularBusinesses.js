import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { backendLink } from '../assets/config';
import image from '../assets/white-waves.png';

export const PopularBusinessesStyles = styled.div`
  width: 100%;
  background-image: url(${image});
  background-repeat: repeat;
  background-position: center;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  height: auto;
  padding-bottom: 10px;

  @media (max-width: 900px) {
    padding-bottom: 0;
  }
  h1 {
    text-align: center;
    width: 100%;
    font-weight: 100;
    padding-bottom: 10px;
  }
  .business {
    width: 22.5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    color: black;
    margin-bottom: 50px;

    @media (max-width: 900px) {
      width: 45%;
    }

    @media (max-width: 500px) {
      width: 90%;
    }

    :hover {
      animation: shadow 0.2s;
      animation-fill-mode: forwards;
    }

    .business__img--image {
      width: 100%;
      max-height: 200px;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }

    .business__text--name {
      font-family: Patua One;
      font-weight: 200;
      text-align: center;
      width: 100%;
      margin-top: 5px;
      font-size: 1.4rem;
    }

    .business__text--rating {
      margin-top: -2rem;
    }
  }

  @keyframes shadow {
    0% {
      box-shadow: none;
    }
    100% {
      box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }

  .business__header {
    margin: 4rem 0 3rem;
  }
`;

class PopularBusinesses extends Component {
  constructor() {
    super();
    this.state = {
      businesses: []
    };
  }
  componentDidMount() {
    axios
      .get(`${backendLink}/api/business`)
      .then(response => {
        //save response data in a new variable
        const data = [...response.data];
        //sorts and slices correct number of businesses
        const sortedAndSliced = data
          .sort((a, b) =>
            a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
          )
          .slice(0, 8);
        //sets sorted array to this.state.businesses
        this.setState(() => ({ businesses: sortedAndSliced }));
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }
  render() {
    return (
      <PopularBusinessesStyles>
        {/* for navbar scroll */}
        <div id='Businesses' />
        <h1 className='business__header'>Popular Businesses</h1>
        {this.state.businesses.map(({ id, name, rating, image }) => (
          <Link className='business' key={id} to={`/business/${id}`}>
            <div className='business__img--image'>
              <img                
                src={image}
                alt='reviewed business'
              />
            </div>            
            <h4 className='business__text--name'>{name}</h4>
            <h1 className='business__text--rating'>{rating}</h1>
          </Link>
        ))}
      </PopularBusinessesStyles>
    );
  }
}
export default PopularBusinesses;
