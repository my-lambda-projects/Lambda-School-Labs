import React from 'react';
import "../../assets/css/general.css"

const Newsletter = () => (
    		<div className="f-email-area">
                <div className="page-holder">
				    <form action="#">
					    <label><strong>Sign up on our newsletter: </strong></label>
					    <input type="text" placeholder="Enter your email address" />
					    <input type="submit" value="sign up" />
				    </form>
			    </div>
		</div>
)
export default Newsletter;