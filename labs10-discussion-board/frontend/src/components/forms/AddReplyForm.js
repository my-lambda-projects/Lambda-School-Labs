import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '../index.js';

// action creators
import { addReply } from '../../store/actions/index.js';

//Style
const AddReplyFormWrapper = styled.form`
	width: 80%;
	padding: 10px;
	color: ${props => props.theme.discussionPostColor};

	textarea {
		width: 100%;
		height: 150px;
		padding: 12px 20px;
		box-sizing: border-box;
		border: 1px solid #ddd;
		border-radius: 4px;
		background-color: #f8f8f8;
		resize: none;
	}
`;

const AddReplyTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 15px;
	p {
		margin-top:0
	}

	.exit{
		background-color: initial;
		border: none;
		color: ${props => props.theme.defaultColor};
		appearance: none;
		-webkit-appearance: none!important;

		&:hover {
			cursor: pointer;
			color: ${props => props.theme.defaultColorOnHover};
		}
	}
`;

const UserActions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	button {
		color: steelblue;
		background: none;
		border:none;
		outline: none;
		
		&:hover {
			cursor: pointer;
			color: black;
		}
	}

	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.username {
		margin-left: 10px;
		color: black;
		text-decoration: none;
	}
`;

class AddReplyForm extends Component {
	state = { replyBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { replyBody } = this.state;
		const { post_id, historyPush, discussion_id } = this.props;
		return this.props.addReply(post_id, discussion_id, replyBody, historyPush);
	};
	handleToggle = () => this.props.toggleAddReplyForm();
	render() {
		const { replyBody } = this.state;
		const{ username, user_id, avatar } = this.props;
		return(
			<AddReplyFormWrapper onSubmit = { this.handleSubmit } >
				<AddReplyTitle>
					<p>Write a Reply</p>
					<span
						className = 'exit'
						onClick = { this.handleToggle }
						type = 'button' // prevents form submission
					><i className="far fa-times-circle"></i></span>
				</AddReplyTitle>
				<textarea
					type= 'text'
					placeholder = 'Write your reply'
					name = 'replyBody'
					onChange = { this.handleChange }
					value = { replyBody }
				/>
				<UserActions>
					<div className='user'>
						<Avatar height='30px' width='30px' src = { avatar } />
						<Link className='username' to={`/profile/${user_id}`}>
							{username}
						</Link>
					</div>
					<button type = 'submit'>Post Reply</button>	
				</UserActions>
			</AddReplyFormWrapper>
		)
	}
}


const mapStateToProps = state => ({
	username: state.users.username,
	user_id: state.users.user_id,
	avatar: state.users.avatar,
});

export default connect(mapStateToProps, { addReply })(AddReplyForm);
