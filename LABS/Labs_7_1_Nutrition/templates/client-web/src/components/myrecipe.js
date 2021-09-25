import React from 'react';
import { Table, Card, Modal, Button } from 'antd';
import axios from 'axios';
import NewReviewModal from './newrecipe.js';
import RecipeList from '../containers/recipelistview.js';

// const config = {
//   headers: {
//     JWT: localStorage.getItem('jwt')
//   }
// };
class MyRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        recipes: []
      }
    };
  }
  
  componentDidMount = () => {
    const token = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    if(username) {
      axios ({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/recipe/',
        data: {
          'username': username,
          'jwt': token
        }
      })
          
      .then(
        axios.spread(res => {
          console.log("My Recipe page get reuest success data: ",res);
          this.setState({
              recipes: res.data
          });
      })
      )
      .catch(err => console.log("Myrecipe page get request error:", err));
      this.props.history.push('/recipe');
  
      } else {
          this.props.history.push('/login');
      }
      // console.log(localStorage.getItem('token')
      
  }
  addRecipe = () => {
    axios
    .get('makes call to backend and get all stored recipes under this username')
    .then(response => {
      this.setState({ data: { ...this.recipes, recipes: response.data } });
    })
    .catch(err => console.log(err.warn));
  };

  render() {
    const fullScreenView = (
      <div>
         <h1> Here you will see your saved recipes</h1>
          <h4>If you have recipes under your username, you will be seeing card view</h4>
          <h4>Otherwise, you can add recipes here</h4>
          <Card style={{ justifyContent: 'center' }}>
              <div>
                 <NewReviewModal 
                  buttonLabel={'+'}
                  addRecipe={this.addRecipe}
                 />
              </div>
          </Card>
      </div>
    );

    const recipeCardList = (
      <div>
      <Card style={{ width: '100px', justifyContent: 'center' }}>
              <div>
                <h4> Add a new recipe</h4>
                 <NewReviewModal 
                  buttonLabel={'+'}
                  addRecipe={this.addRecipe}
                 />
              </div>
          </Card>
          <Card style={{ width: '100px', justifyContent: 'center' }}>
            <div>
            {this.state.data.recipes.map(recipe => {
                return (
                  <RecipeList 
                  {... recipe}
                  removeReview={this.handleRemove}
                  />
                );
              })}
            </div>
              
          </Card>
        </div>
    );
    
          
          {/* <Table
          itemLayout="vertical"
          size="large"
          pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
          dataSource={this.recipes}
          // columns={columns}
          /> */}
          
    return (
      <div>
        {this.state.data.recipes.length === 0 ? fullScreenView : recipeCardList}
      </div>
    )
  }
}
export default MyRecipes;