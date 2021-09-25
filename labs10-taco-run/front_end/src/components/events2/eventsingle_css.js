import styled from 'styled-components'

export const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	border: solid black 1px;
	padding: 1%;
	border-radius: 4px;
`

export const Comment = styled.div`
	border: solid black 1px;
	padding: 1%;
	margin: 10px 0;
	width: 100%;
`

export const FormComment = styled.form`
	border: solid black 1px;
	> textarea {
		width: 100%;
		height: 80px;
	}
`

export const CommentSubmit = styled.button`
	border: solid black 1px;
	padding: .5%;
	margin-top: 10px;
	border-radius: 4px;
	background-color:grey;
	color:white;
	&:hover {
		background-color:white;
		color:grey;
	}
`

export const DeleteBtn = styled.button`
	border: solid black 1px;
	width: 20px;
	height: 100%;
	margin-top: 10px;
	background-color: grey;
	color: white
	&:hover {
		background-color: white;
		color: grey;
	}
	margin-right: 1%;
`

export const FlexDiv = styled.div`
	display:flex;
	flex-direction:column;
`





