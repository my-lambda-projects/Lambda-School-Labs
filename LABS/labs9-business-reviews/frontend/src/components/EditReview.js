import React, { Component } from 'react';
import Axios from 'axios';
import { backendLink } from '../assets/config';
import styled from 'styled-components';
import NavBar from './NavBar';

const StyledEdit = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 60px;

  label {
    margin-bottom: 6px;
    margin-right: 8px;
  }

  .review__input--title {
    width: 90%;
    height: 20px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 1.5rem;
  }
  .review__input--body {
    width: 90%;
    height: 200px;
    margin-bottom: 30px;
    padding: 10px;
    font-size: 1.5rem;
  }

  .review__headline {
    font-family: Roboto;
    font-size: 2rem;
  }

  .review__rating {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .review__input--rating {
    width: 100px;
    font-size: 1.4rem;
    margin-right: 30px;
  }

  .review__rating {
    display: flex;
    align-items: center;
  }

  label {
    font-family: Roboto;
    font-weight: bold;
  }

  .btn {
    background-color: #eed974;
    height: 40px;
    width: 120px;
    margin-right: 20px;
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.19);
  }

  .link {
    border-bottom: 1px solid black;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    height: 40px;
    width: 100px;
    font-family: Roboto;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 1rem;
    margin-top: -0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    padding: 10px;
    margin-top: 35px;
    justify-content: center;
    border-radius: 5px;

    textarea {
      height: 200px;
      resize: none;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    .container {
      display: flex;
      justify-content: center;
    }
    form {
      padding-top: 30px;
      background: white;
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      h1 {
        width: 100%;
      }

      .review__input--title {
        width: 80%;
        height: 20px;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 1rem;
      }

      .review__input--body {
        width: 80%;
        height: 200px;
        margin-bottom: 15px;
        resize: none;
        font-size: 1rem;
      }
    }

    @media (max-width: 550px) {
      form {
        h1 {
          font-size: 1.5rem;
          margin-bottom: 0px;
        }
        .review__input--title {
          height: 10px;
        }
        .review__input--body {
          height: 125px;
        }
        .review__input--rating {
          width: 40%;
        }
        .btn {
          width: 40%;
        }
      }
    }
  }
`;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      rating: 1
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { reviewId } = this.props.match.params;
    Axios.put(`${backendLink}/api/review/${reviewId}`, this.state, {
      withCredentials: 'include'
    })
      .then(res => {
        console.log(res.status);
        if (res.data.message) return alert(res.data.message);
        this.props.history.goBack();
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    const { reviewId } = this.props.match.params;
    Axios.get(`${backendLink}/api/review/${reviewId}`)
      .then(res => this.setState(...res.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <NavBar />
        <StyledEdit>
          <div className='container'>
            <form onSubmit={this.handleSubmit}>
              <h1 className='review__headline'>Edit your review</h1>

              <label htmlFor='review__title'>Title</label>
              <input
                onChange={this.changeHandler}
                name='title'
                value={this.state.title}
                className='review__input--title'
              />
              <label htmlFor='review__title'>Review</label>
              <textarea
                onChange={this.changeHandler}
                name='body'
                value={this.state.body}
                className='review__input--body'
              />
              <div className='review__rating'>
                <label htmlFor='review__input--rating'>Rating</label>
                <select
                  onChange={this.changeHandler}
                  name='rating'
                  value={this.state.rating}
                  className='review__input--rating'
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option defaultValue='5'>5</option>
                </select>
                <button className='link' onClick={this.handleSubmit}>
                  Submit Review
                </button>
                <button className='link' onClick={this.props.toggleReviewing}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </StyledEdit>
      </div>
    );
  }
}
