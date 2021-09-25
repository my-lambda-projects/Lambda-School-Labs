import React, { useEffect } from 'react';

const Preloader = props => {

    useEffect( () => {
        let vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        localStorage.setItem('token', vars.token);
        localStorage.setItem('username', vars.username);
        localStorage.setItem('id', vars.userid);
        localStorage.setItem('inDbHaveEmail', vars.inDatabaseHaveEmail)
        if(vars.inDatabaseHaveEmail === 'true') {
            props.history.push(`/dashboard/${vars.username}`)
        } else {
            props.history.push('/register/2')
        }
    }, []);

    return(
        <div>
        </div>
    )
}

export default Preloader;
