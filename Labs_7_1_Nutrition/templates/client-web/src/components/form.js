
import React from 'react';
import { Form, Input, Button, TextArea } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeTitle: '',
      cookTime: '',
      cookingMethod: '',
      recipeCategory: '',
      recipeCuisine: '',
      recipeIngredients: '',
      recipeInstructions: '',
      recipeYield: '',
      suitableForDiet: '',

    
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value,
    });
}
		handleFormSubmit = (event, requestType, ingId) => {
			event.preventDefault();
			
			console.log("line number 13",this.state.cookingMethod,this.state.cookTime); //data gets caught
			// switch ( requestType ) {
      //   case 'post':
      //   return(
        const {
        recipeTitle,
        cookTime,
        cookingMethod,
        recipeCategory,
        recipeCuisine,
        recipeIngredients,
        recipeInstructions,
        recipeYield,
        suitableForDiet,
        } = this.state;

      axios.post('http://localhost:8000/api/recipe/', {
        recipeTitle,
        cookTime,
        cookingMethod,
        recipeCategory,
        recipeCuisine,
        recipeIngredients,
        recipeInstructions,
        recipeYield,
        suitableForDiet,
      })
                // CookTime: cookTime,
                // CookingMethod: cookingMethod,
                // RecipeCuisine: recipeCuisine,
                // RecipeInstructions: recipeInstructions,
                // RecipeYield: recipeYield,
                // SuitableForDiet: suitableForDiet,
              
              .then((res) => {console.log("success");
                this.props.history.push('/recipe');
            })
              .catch(err => console.log("Form error at line 22"))
              // );
		
				// case 'put':
				// 	return ( axios.put(`/api/recipe/${ingId}/`, {
				// 		CookTime: cookTime,
				// 		CookingMethod: cookingMethod
				// 		})
				// 		.then(res => console.log(res))
        //     .catch(err => console.log("error message:",err))
        //   );
			// }
     }
    
  render() {
    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(
          event)}>
          {/* this.props.requestType,this.props.ingId these two parameters addon when create serves as edit. */}
          <FormItem label="Recipe Title">
            <Input name="RecipeTitle" placeholder="Recipe Title" onChange={this.handleChange} />
          </FormItem>
          <FormItem label="Cook Time: ">
            <Input name="CookTime" placeholder="How long it will take?" onChange={this.handleChange} />
          </FormItem>
          <FormItem label="Cooking Method: ">
            <Input name="CookingMethod" placeholder="Baking, steaming, frying..." onChange={this.handleChange} />
          </FormItem>
					<FormItem label="Recipe Category: ">
            <Input name="RecipeCategory" placeholder="Baking, steaming, frying ..." onChange={this.handleChange} />
          </FormItem>
					<FormItem label="Recipe Cuisine: ">
            <Input name="RecipeCuisine" placeholder="So, what cusine is this?..." onChange={this.handleChange} />
          </FormItem>
          <FormItem label=" Recipe Ingredients: ">
          <Input name="RecipeIngredients" placeholder="Step by step preperation instructions goes here..." onChange={this.handleChange} />
          </FormItem>
					<FormItem label="Recipe Instructions: ">
          <Input name="RecipeInstructions" placeholder="Step by step preperation instructions goes here..." onChange={this.handleChange} />
          </FormItem>
					<FormItem label="Recipe Yield: ">
            <Input name="RecipeYield" placeholder="how many in number..." onChange={this.handleChange}/>
          </FormItem>
					<FormItem label="Suitable For Diet: ">
            <Input name="SuitableForDiet" placeholder="Suitable For what Diet..." onChange={this.handleChange} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">Create Recipe</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default CustomForm;
