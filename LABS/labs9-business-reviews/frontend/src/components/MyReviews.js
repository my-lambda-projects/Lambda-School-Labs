import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { backendLink } from '../assets/config';
import Stars from './Stars';

const StyledReviews = styled.div`
  box-sizing: border-box;
  width: 1200px;
  height: auto;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  padding: 20px;
  @media (max-width: 900px) {
    width: 100%;
  }
  h1 {
    margin-top: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    font-size: 3rem;
  }
  .review {
    margin: 1rem 1rem;
    box-sizing: border-box;
    width: 30%;
    height: auto;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    .reset-password {
      font-weight: bold;
      font-family: Roboto;
      text-align: left;
      text-decoration: none;
      color: black;
      border-bottom: 1px solid black;
      margin-bottom: 30px;
      font-size: 14px;
    }
  }

  h1 {
    margin-top: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    font-size: 3rem;
  }
  .review {
    box-sizing: border-box;
    width: 30%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    color: black;
    padding-bottom: 20px;

    :hover {
      animation: shadow 0.2s;
      animation-fill-mode: forwards;
    }

    @media (max-width: 900px) {
      width: 45%;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    @media (max-width: 500px) {
      width: 90%;
      margin: 0 auto;
      margin-bottom: 20px;
    }

    .review_img {
      width: 100%;
      max-height: 200px;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }

    .review__title {
      font-size: 1.4rem;
      font-family: Roboto;
    }
    .review__business {
      text-align: center;
      box-sizing: border-box;
      text-transform: uppercase;
      margin-top: 0rem;
      width: 100%;
      padding: 0 20px;
    }

    .review__body {
      font-family: Roboto;
      font-style: italic;
      padding: 0 20px;
      margin-top: 0rem;
    }

    .review__rating--stars {
      background-color: #eed974;
      padding: 0 10px;
      line-height: 0.8;
    }
    .button-container {
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding-top: 30px;
      a,
      p {
        border-bottom: 1px solid black;
        font-family: Roboto;
        text-align: center;
        font-weight: bold;
        padding: 10px 0;
        width: 20%;
        text-decoration: none;
        color: black;
        cursor: pointer;
      }
    }
    p {
      height: auto;
    }
    h4 {
      width: 100%;
      height: auto;
      text-align: center;
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
`;

class MyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      name: props.name,
      gravatar: props.gravatar,
      clickable: null
    };
  }
  handleUnclickable = () => {
    alert('You can only edit your own reviews');
  };
  handleDelete = e => {
    const id = e.target.id;
    Axios.delete(`${backendLink}/api/review/${id}`)
      .then(res => console.log(res.status))
      .catch(err => console.log(err));
    alert('Review Deleted');
  };
  async componentDidMount() {
    const ids = this.props.id;
    Axios.get(`${backendLink}/api/user/${ids}/reviews`)
      .then(res => this.setState({ reviews: res.data }))
      .catch(err => console.log(err));

    const {
      data: {
        user: [{ id }]
      }
    } = await Axios.get(`${backendLink}/api/user/me`, {
      withCredentials: 'include'
    });
    if (!id) return this.setState({ clickable: false });
    this.setState({ clickable: id === Number(ids) });
  }
  render() {
    return (
      <StyledReviews>
        <h1>My reviews</h1>
        {this.state.reviews
          ? this.state.reviews.map(
              ({
                title,
                body,
                business_image,
                business_name,
                reviewer_id,
                id,
                rating
              }) => {
                if (!this.state.clickable)
                  return (
                    <div
                      onClick={this.handleUnclickable}
                      key={id}
                      className='review'
                    >
                      <div className='review_img'>
                        <Link to={`/buiness/${id}`}>
                          <img src={`${business_image}`} alt='business' />
                        </Link>
                      </div>
                      <h2 className='review__business'>{business_name}</h2>
                      <h4 className='review__title'>{title}</h4>
                      <p className='review__body'>{body}</p>
                      <Stars
                        rating={rating}
                        className='business__rating--stars'
                      />
                    </div>
                  );
                return (
                  <div key={id} className='review'>
                    <div className='review_img'>
                      <img src={`${business_image}`} alt='business' />
                    </div>
                    <h2 className='review__business'>{business_name}</h2>
                    <h4 className='review__title'>{title}</h4>
                    <p className='review__body'>{body}</p>
                    <Stars
                      rating={rating}
                      className='business__rating--stars'
                    />
                    <div className='button-container'>
                      <Link to={`/user/review/${id}`}>EDIT</Link>
                      <Link to='/' id={id} onClick={this.handleDelete}>
                        DELETE
                      </Link>
                    </div>
                  </div>
                );
              }
            )
          : null}
      </StyledReviews>
    );
  }
}

export default MyReviews;
