import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SearchBarStyles = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (max-height: 690px) {
    padding-top: 0;
    padding-bottom: 0;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (max-width: 700px) {
      flex-direction: column;
      .search__input {
        margin-bottom: 15px;
      }
    }
    .search__input {
      color: white;
      height: 45px;
      width: 700px;
      font-size: 1.4rem;
      padding: 0.4rem;
      margin-right: 30px;
      border: 0.5px solid rgba(0, 0, 0, 0);

      background-color: rgba(0, 0, 0, 0.5);
      ::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      @media (max-width: 520px) {
        width: 100%;
        margin: 0;
        margin-bottom: 15px;
      }
    }

    .search__input:hover,
    .search__input:focus {
      border: 0.5px solid #eed974;
    }

    .button {
      background-color: #eed974;
      font-size: 1.1rem;
      font-family: Roboto;
      height: 55px;
      width: 120px;
      margin-right: 10px;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }
  @media (max-width: 900px) {
    margin-left: 10px;
    form {
      display: inline-flex;
      .search__input {
        margin-right: 20px;
        width: 75%;
      }
      .button {
        margin-right: 20px;
      }
    }
  }
`;

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      business: [
        {
          id: '',
          adr_address: '',
          photos: [],
          place_id: '',
          rating: 0,
          website: ''
        }
      ],
      inputVal: ''
    };
  }

  componentDidMount() {
    const input = document.querySelector('#dropdown'); /// yooooooooo

    const dropdown = new window.google.maps.places.Autocomplete(input);
    dropdown.addListener('place_changed', () => {
      const place = dropdown.getPlace();
      this.setState({ business: place });
    });
  }
  handleChange = e => {
    this.setState({ inputVal: e.target.value });
  };

  render() {
    return (
      <SearchBarStyles>
        <form>
          <input
            onChange={this.handleChange}
            className='search__input'
            id='dropdown'
            placeholder='What are you looking for?'
          />
          <Link
            to={
              this.state.inputVal
                ? `/business/${this.state.business.place_id}`
                : '/'
            }
          >
            <button className='button'>Search</button>
          </Link>
        </form>
      </SearchBarStyles>
    );
  }
}

export default SearchBar;
