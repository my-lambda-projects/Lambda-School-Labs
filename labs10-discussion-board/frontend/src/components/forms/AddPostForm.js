import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '../index.js';

// import { appBgColor } from '../../globals/globals.js'


// action creators
import { addPost } from '../../store/actions/index.js';

const AddPostFormWrapper = styled.form`
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

const AddCommentTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

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

	.submit-btn {
		color: steelblue;
		background: none;
		border: none;
		outline: none;

		&:hover {
			cursor: pointer;
			color: lightsteelblue;
		}
	}

	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.username {
		margin-left: 10px;
		color: ${props => props.theme.discussionPostColor};		
		text-decoration: none;

		&:hover {
			cursor: pointer;
			color: lightsteelblue;
		}
	}
`;

class AddPostForm extends Component {
	state = { postBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { postBody } = this.state;
		const { discussion_id, historyPush } = this.props;
		return this.props.addPost(discussion_id, postBody, historyPush);
	};
	
	render() {		
		const { postBody } = this.state;
		const { toggleAddPostForm, username, user_id, avatar } = this.props;
		return(
			<AddPostFormWrapper onSubmit = { this.handleSubmit }>
				<AddCommentTitle>
					<p>Write a comment</p>
					<span
						className = 'exit'
						onClick = { toggleAddPostForm }
						type = 'button' // prevents form submission
					><i className="far fa-times-circle"></i></span>
				</AddCommentTitle>
				<textarea
					type= 'text'
					placeholder = 'Write your comment'
					name = 'postBody'
					onChange = { this.handleChange }
					value = { postBody }
				/>
				<UserActions>
					<div className='user'>
						<Avatar height='30px' width='30px' src = { avatar } />
						<Link className='username' to={`/profile/${user_id}`}>
							{username}
						</Link>
					</div>
					<button className = 'submit-btn' type = 'submit'>Post comment</button>	
				</UserActions>
			</AddPostFormWrapper>
		);
	}
};

const mapStateToProps = state => ({
	username: state.users.username,
	user_id: state.users.user_id,
	avatar: state.users.avatar,
});

export default connect(mapStateToProps, { addPost })(AddPostForm);
