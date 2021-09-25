import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import styled from 'styled-components';
import AddFromWeb from './components/AddFromWeb';
import './App.css';
import DisplayListRecipes from './components/DisplayListRecipes';
import AddNewRecipeForm from './components/AddNewRecipeForm';
import { withFirebase } from './components/firebase';
import SingleRecipe from './components/SingleRecipe';
import EditRecipe from './components/EditRecipe';
import SignUp from './components/auth/signUp';
import SignIn from './components/auth/signIn';
import SignOut from './components/auth/signOut';
import CheckoutForm from './components/CheckoutForm';
import Settings from './components/Settings';
import ConditionalLanding from './components/Landing';

const MainDisplayDiv = styled.div`
  padding-bottom: 40px;
`;

class MainDisplaySection extends Component {
  // componentDidMount and componentWillUnmout is used to check if user is loggedin
  // it will make state changes when user login or out.
  // guide provide other way that remove this.  that require more higher order components.
  // but that method would be hard to use redux state management
  // it might be good to use higher order components and not using redux...

  render() {
    if (localStorage.uid) {
    }
    return (
      <MainDisplayDiv className="mainDisplaySection">
        <Route exact path="/" component={ConditionalLanding} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
        <Route
          path="/billing"
          render={props => (
            <Elements>
              <CheckoutForm {...props} />
            </Elements>
          )}
        />
        <Route path="/settings" component={Settings} />
        <Route exact path="/recipes" component={DisplayListRecipes} />
        <Route path="/recipes/new" component={AddNewRecipeForm} />
        <Route path="/recipes/one/:id" component={SingleRecipe} />
        <Route path="/recipes/edit/:id" component={EditRecipe} />
        <Route path="/recipes/import" component={AddFromWeb} />
      </MainDisplayDiv>
    );
  }
}

export default withFirebase(MainDisplaySection);
