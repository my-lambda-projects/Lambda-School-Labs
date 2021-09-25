import React from 'react';
import { Button } from 'antd';


class Login extends React.Component {
    constructor() {
        super();  
    }
    
    componentWillMount() {
	    localStorage.removeItem('username','');
        localStorage.removeItem('token', '');
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <h2> You have successfully logged out.  </h2>
                <br />
                <h2> Do you want to sign in? </h2>
                <div>
                        <Button type="primary" htmlType="submit"> Back to home </Button>
                </div>
            </div>
        );
    }
}
export default Login;