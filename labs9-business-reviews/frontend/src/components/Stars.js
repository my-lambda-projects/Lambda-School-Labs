import React from 'react';

import fullStar from '../assets/star-full.svg';
import halfStar from '../assets/star-half.svg';
import emptyStar from '../assets/star-empty.svg';

// creates a representation of the score by returning
// the appropriate number of SVG stars

export default class Stars extends React.Component {
  render() {
    let ratingValue = this.props.rating;
    let stars;

    if (ratingValue === 5) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
        </div>
      );
    } else if (ratingValue >= 4.5 && ratingValue < 5) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='halfStar' src={halfStar} alt='star' />
        </div>
      );
    } else if (ratingValue >= 4 && ratingValue <= 4.5) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='halfStar' src={halfStar} alt='half star' />
        </div>
      );
    } else if (ratingValue >= 3.5 && ratingValue <= 4) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else if (ratingValue >= 3 && ratingValue <= 3.5) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='halfStar' src={halfStar} alt='half star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else if (ratingValue >= 2.5 && ratingValue <= 3) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else if (ratingValue >= 2 && ratingValue <= 2.5) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='halfStar' src={halfStar} alt='half star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else if (ratingValue >= 1.5 && ratingValue <= 2) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else if (ratingValue >= 1 && ratingValue <= 1.5) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='halfStar' src={halfStar} alt='half star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else if (ratingValue >= 0.5 && ratingValue <= 1) {
      stars = (
        <div className='starRating'>
          <img className='fullStar' src={fullStar} alt='star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else if (ratingValue >= 0 && ratingValue <= 0.5) {
      stars = (
        <div className='starRating'>
          <img className='halfStar' src={halfStar} alt='half star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    } else {
      stars = (
        <div className='starRating'>
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
          <img className='emptyStar' src={emptyStar} alt='empty star' />
        </div>
      );
    }
    return stars;
  }
}
