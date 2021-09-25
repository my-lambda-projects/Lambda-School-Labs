import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Rating, Table, Header, Segment, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import ourColors from '../ColorScheme';
import {
  getRecipe,
  deleteRecipe,
  getNutrition,
  removeNutrition,
  getUser,
  addRecipe,
  ratingChange
} from '../actions';
import { downloadRecipeToCSV } from '../components/util';

const ImageIngrDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-left: 2.5%;
`;

class SingleRecipe extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
    this.props.getUser();
  }

  getNutrition = () => {
    const { name, ingredients } = this.props.recipe;
    const ingrArr = ingredients.map(
      ingr =>
        `${ingr.quantity ? ingr.quantity : ''} ${ingr.unit ? ingr.unit : ''} ${
          ingr.name
        }`
    );
    this.props.getNutrition(name, ingrArr); // gets nutritional value of recipe from Edamam
  };

  deleteRecipe = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id);
    this.props.history.push('/recipes');
  };

  copyRecipe = async recipe => {
    await this.props.addRecipe({
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      firebaseid: localStorage.getItem('uid'),
      ingredients: recipe.ingredients
    });
  };

  ratingsFunc = recipe => {
    // gets all ratings for recipe
    if (!recipe.ratings || !recipe.ratings[0]) {
      return 0;
    } else {
      const ratingArr = recipe.ratings.map(rating => rating.rating);
      const avgRating =
        ratingArr.reduce((acc, num) => acc + num, 0) / recipe.ratings.length;
      return Math.round(avgRating);
    }
  };

  rateFunc = (e, data, recipeid) => {
    // processes rating from user for recipe
    this.props.ratingChange(recipeid, data.rating);
  };

  componentWillUnmount() {
    this.props.removeNutrition(); // removes nutrition from state
  }

  displayRecipe = recipe => {
    return (
      <React.Fragment>
        <Segment floated='right' textAlign='center'>
          {recipe.user_id !== this.props.user.id &&
            localStorage.getItem('uid') && (
              <Icon
                name='copy'
                onClick={async () => {
                  await this.copyRecipe(recipe);
                  this.props.history.push('/recipes');
                }}
                size='large'
                style={{ cursor: 'pointer' }}
              />
            )}
          {/* below button initiate download currently displaying recipe into excel fileURLToPath */}
          {this.props.user.subscriptionid && (
            <Icon
              name='download'
              size='large'
              onClick={() => downloadRecipeToCSV(recipe)}
              style={{ cursor: 'pointer' }}
            />
          )}
          {recipe.user_id === this.props.user.id && (
            <Link to={`/recipes/edit/${this.props.match.params.id}`}>
              <Icon
                name='edit'
                color='green'
                size='large'
                style={{ cursor: 'pointer' }}
              />
            </Link>
          )}
          {recipe.user_id === this.props.user.id && (
            <Icon
              name='delete'
              color='red'
              size='large'
              onClick={this.deleteRecipe}
              style={{ cursor: 'pointer' }}
            />
          )}
        </Segment>
        <Header as='h1' style={{ marginBottom: '5px', marginTop: 0 }}>
          {recipe.name}
        </Header>
        <div>
          <Rating
            icon='star'
            size='huge'
            rating={this.ratingsFunc(recipe)}
            onRate={(e, data) => this.rateFunc(e, data, recipe.id)}
            maxRating={5}
            disabled={!localStorage.getItem('uid')}
          />
          <Header as='h6' style={{ marginTop: '0px' }}>
            {this.props.recipe.ratings ? this.props.recipe.ratings.length : 0}{' '}
            review(s)
          </Header>
        </div>
        <ImageIngrDiv>
          {recipe.imageUrl && (
            <Image
              src={recipe.imageUrl}
              size='medium'
              rounded
              style={{ marginTop: '10px', maxHeight: '239.52px' }}
            />
          )}
          <div
            style={{
              fontFamily: 'Roboto',
              marginTop: '10px',
              marginLeft: '10px',
              flexGrow: 1,
              alignSelf: 'stretch'
            }}
          >
            <Header as='h3' attached='top' textAlign='left'>
              Ingredients
            </Header>
            <Segment attached textAlign='left'>
              <ul>
                {recipe.ingredients.map(ingr => {
                  const boolArr = this.props.user.allergies.map(allergy =>
                    ingr.name.includes(allergy.name)
                  );
                  if (boolArr.includes(true)) {
                    return (
                      <li
                        key={ingr.name}
                        style={{
                          background: ourColors.warningTranslucent,
                          boxShadow: `0 0 3px ${ourColors.warningTranslucent}`
                        }}
                      >{`${ingr.quantity} ${ingr.unit ? ingr.unit : ''} ${
                        ingr.name
                      }`}</li>
                    );
                  } else {
                    return (
                      <li key={ingr.name}>{`${ingr.quantity} ${
                        ingr.unit ? ingr.unit : ''
                      } ${ingr.name}`}</li>
                    );
                  }
                })}
              </ul>
            </Segment>
          </div>
        </ImageIngrDiv>
        <br />
        <div style={{ width: '95%', marginLeft: '2.5%', fontFamily: 'Roboto' }}>
          <Header as='h3' attached='top' textAlign='left'>
            Recipe Description
          </Header>
          <Segment attached textAlign='left'>
            {Parser(recipe.description)}
          </Segment>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { recipe, nutrition } = this.props;
    if (recipe && !nutrition) {
      this.getNutrition();
      return <div>{this.displayRecipe(recipe)}</div>;
    } else if (recipe && nutrition) {
      // copy of the above code except showing nutrition info when they're a subscriber
      return (
        <div>
          {this.displayRecipe(recipe)}
          <Table
            celled
            structured
            style={{
              width: '95%',
              marginLeft: '2.5%',
              fontFamily: 'Roboto',
              background: ourColors.formColor
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell style={{ background: ourColors.formColor }}>
                  <Header as='h3'>Nutrition Facts</Header>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Servings: {nutrition.yield}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Calories: {nutrition.calories}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Diet Labels:{' '}
                  {nutrition.dietLabels.map(label => label.toLowerCase() + ' ')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Health Labels:{' '}
                  {nutrition.healthLabels.map(
                    label => label.toLowerCase() + ' '
                  )}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Carbohydrates:{' '}
                  {nutrition.totalNutrients.CHOCDF
                    ? `${Math.round(
                        nutrition.totalNutrients.CHOCDF.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.CHOCDF.unit}`
                    : '0 g'}
                  {' | '}
                  {nutrition.totalNutrients.CHOCDF
                    ? Math.round(nutrition.totalDaily.CHOCDF.quantity * 10) / 10
                    : 0}
                  % Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Protein:{' '}
                  {nutrition.totalNutrients.PROCNT
                    ? `${Math.round(
                        nutrition.totalNutrients.PROCNT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.PROCNT.unit}`
                    : '0 g'}
                  {' | '}
                  {nutrition.totalNutrients.PROCNT
                    ? Math.round(nutrition.totalDaily.PROCNT.quantity * 10) / 10
                    : 0}
                  % Daily Value
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Fat:{' '}
                  {nutrition.totalNutrients.FAT
                    ? `${Math.round(
                        nutrition.totalNutrients.FAT.quantity * 10
                      ) / 10} ${nutrition.totalNutrients.FAT.unit}`
                    : '0 g'}
                  {' | '}
                  {nutrition.totalNutrients.FAT
                    ? Math.round(nutrition.totalDaily.FAT.quantity * 10) / 10
                    : 0}
                  % Daily Value
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      );
    } else {
      return (
        <Segment loading style={{ width: '95%', marginLeft: '2.5%' }}>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipesReducer.recipe,
    nutrition: state.nutritionReducer.nutrition,
    user: state.usersReducer.user,
    rating: state.recipesReducer.rating
  };
};

export default connect(
  mapStateToProps,
  {
    getRecipe,
    deleteRecipe,
    getNutrition,
    removeNutrition,
    getUser,
    addRecipe,
    ratingChange
  }
)(SingleRecipe);
