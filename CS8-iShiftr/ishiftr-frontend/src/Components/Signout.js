import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
class SignOut extends Component {
    
    render() {
        return (
            <div>
                <Link to="/">
                    <Button className = 'bg-white border-white text-dark' type="submit" onClick={() => { 
                        localStorage.removeItem("authToken"); localStorage.removeItem("id"); localStorage.removeItem('employer'); }}>Sign Out
                    </Button>
                </Link>
            </div>
        );
    }
}

export default SignOut;
