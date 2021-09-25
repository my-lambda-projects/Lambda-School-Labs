// displayOneRecipe.js is a component that display full info of one recipe
// It gets recipe object as props (might be changed)
// and display the info
// Display two buttons - edit and delete.  Both buttons will be linked to a props methods

import React from 'react';
import { Link } from 'react-router-dom';
import { Rating, Card, Image } from 'semantic-ui-react';

import ourColors from '../ColorScheme.js';

import defaultImage from '../images/defaultimage.jpeg';

const DisplayOneRecipe = props => {
  const ratingsFunc = recipe => {
    if (!recipe.ratings || !recipe.ratings[0]) {
      return 0;
    } else {
      const ratingArr = recipe.ratings.map(rating => rating.rating);
      const avgRating =
        ratingArr.reduce((acc, num) => acc + num, 0) / recipe.ratings.length;
      return Math.round(avgRating);
    }
  };

  return (
    <Link
      to={`/recipes/one/${props.recipe.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        style={{
          boxShadow: props.allergy
            ? `0 0 3px 5px ${ourColors.warningColor}`
            : `0 0 3px 1px ${ourColors.outlineColor}`,
          width: '200px',
          height: '200px',
          margin: '10px',
          overflow: 'hidden',
          fontFamily: 'Roboto'
        }}
      >
        {props.recipe.imageUrl ? (
          <Image src={props.recipe.imageUrl} style={{ height: '133px' }} />
        ) : (
          <Image src={defaultImage} />
        )}
        <Card.Content style={{ paddingTop: '4px' }}>
          <Card.Header
            as='h3'
            style={{
              maxHeight: '45px',
              overflow: 'hidden',
              fontSize: '1.1rem'
            }}
          >
            {props.recipe.name}
          </Card.Header>
          <div>
            <Rating
              icon='star'
              rating={ratingsFunc(props.recipe)}
              maxRating={5}
              disabled
            />
            {props.recipe.ratings ? props.recipe.ratings.length : 0}
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
};

DisplayOneRecipe.defaultProps = {
  fetching: false,
  recipes: [],
  error: null
};

export default DisplayOneRecipe;
