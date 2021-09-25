import React from 'react';
import '../css/botCss.css'

const SignIn = () => (
	<div className='botSignIn'>
		<a href="https://slack.com/oauth/authorize?client_id=270618182930.333388702161&scope=bot,incoming-webhook,search:read&redirect_uri=https://64e527cb.ngrok.io/auth/bot">
			<img
				alt="Add to Slack"
				height="40"
				width="139"
				src="https://platform.slack-edge.com/img/add_to_slack.png"
				srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
			/>
		</a>
	</div>
);

export default SignIn;
