import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/landing.js';
import Myrecipe from '../components/myrecipe.js';
import IngredientDetail from '../containers/ingredientdetailview.js';
import Login from '../components/login.js';
import Register from '../components/register.js';
import Logout from '../components/logout.js';
import { Layout } from 'antd';

const { Content } = Layout;
const Main = () => (
    <Content style={{ padding: '0 50px', height: '100vh'}}>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/recipe' component={Myrecipe} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/ing/:ingredientid' component={IngredientDetail} />
            <Route path='/logout' component={Logout} />
        </Switch>
    </Content>

)

export default Main;