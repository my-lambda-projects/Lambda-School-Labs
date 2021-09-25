import React from 'react';
import axios from 'axios';

import { Card, Button } from 'antd';
import CustomForm from '../components/form.js';

class IngredientDetail extends React.Component {
    state = {
        ingredients: {}

    }
    componentDidMount() {
        const ingId = this.props.match.params.ingredient;
        console.log(JSON.stringify(ingId));
        axios.get(`http://127.0.0.1.8000/api/${ingId}`)
        .then(res => {
            this.setState({
                ingredients: res.data
            });
            console.log(res.data); 
        })
		.catch(err => console.log("Caught error"));
    }
    handleDelete = (event) => {
        const ingId = this.props.match.params.ingredientID;
        axios.get(`http://127.0.0.1.8000/api/${ingId}`);
        //this.props.history.push('/'); //react router dom package
        //this.forceUpdate(); // Needs to fix. 
        
    }
    render() {
        return (
            <div>
                <h1>Ingredient Modal view</h1>
                <h2>under progress...</h2>
                <Card CookTime={this.state.ingredients.CookTime}> 
				    <p>{this.state.ingredients.CookingMethod}</p> 
                    {/* .details */}
                </Card>
                <CustomForm 
                    requestType="put"
                    ingId={this.props.match.params.ingId}
                    btnText="Update"/>
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
            </div>
            
        )
    }
}
export default IngredientDetail;