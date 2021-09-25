import React from 'react';
import axios from 'axios';
import { Card } from 'antd';
import Myrecipes from '../components/myrecipe.js';
import CustomForm from '../components/form.js';

//Recipe gets created and saves in DB

class RecipeList extends React.Component {
    state = {
        recipes: []

    }
    componentDidMount = () => {
        
        const username = localStorage.getItem('username');
        console.log("In recipe list view username is:",username);
        // if(username) {
        //     axios.get(`http://127.0.0.1:8000/api/recipe/${username}`)
        // .then(res => {
        //     console.log("Recipelist View data: ",res.data);
        //     this.setState({
        //         recipes: res.data
        //     });
        // })
        // .catch(err => console.log("recipelist view error:", err));
        // this.props.history.push('/recipe');
		
        // } else {
        //     this.props.history.push('/login');
        // }
        //const token = localStorage.getItem('token');
        
    }
    // render() {
    //     if(this.state.recipes.length !== 0) {
    //         // console.log("First row:  ",this.state.recipes[0].CookTime)
    //         return (
    //             <div> 
    //                 <h1> Hi, here are the list of recipes you have created.</h1> 
    //                 <Myrecipes data={this.state.recipes} />
    //                 <br />
    //                 <h2>Create recipe</h2>
    //                 <CustomForm 
    //                     requestType="post"
    //                     ingId={null}
    //                     btnText="Create"/>
    //             </div>
                
    //         )
    //     }
    //     else {
    //         return (
    //             <div>  
    //                 <h1>Hey there! Looks like you need to create recipes. </h1>
    //                 <h2>Create recipe</h2>
    //                 <Card style={{ width: 500 }}>

    //                 <CustomForm 
    //                     requestType="post"
    //                     ingId={null}
    //                     btnText="Create"/>
    //                 </Card>
    //         </div>
    //         )
    //     }
        
    // }
}
export default RecipeList;