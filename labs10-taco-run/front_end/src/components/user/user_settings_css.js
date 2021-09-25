import styled from 'styled-components'

export const ProfileForm = styled.form`
	> h2 {
		margin: 15px 0px;
	}
	> h3 {
		margin: 15px 0;
	}
	display:flex;
	flex-direction:column;
	max-width: 520px;
	margin: 0 auto;
	padding: 2%;
	border-radius: 4px;
	> input {
		font-size: 1.4rem;
		// border: solid black 1px;
		margin-bottom: 15px;
		max-width: 400px;
		padding: 1%;
		border-radius: 4px;
	}
`
export const ContainForm = styled.div`
	max-width: 800px;
	margin: 40px auto;
	width: 96%;
	border: solid black 1px;
	padding: 2%;
	@media (max-width: 645px) {
		margin-top: 20px;
	}
	border-radius: 4px;
	> h1 {
		text-align: center;
		margin-bottom: 30px;
	}
`

export const Reset = styled.div`
	border: solid black 1px;
	display: inline-block;
	padding: 1%;
	border-radius: 4px;
	background-color:grey;
	color:white
	font-size: 1.4rem;
	margin-top: 30px;
	width: 100px;
	&:hover {
		color:grey
		background-color:white;
		cursor:pointer;
	}
`

export const Switch = styled.div`
	> div {
		display: flex;
		justify-content:center;
	}
	max-width: 200px;
	margin: 0 auto;
	border: solid black 1px;
`

export const SwitchTab = styled.div`
	width: 100%;
	text-align: center;
	border:solid black 1px;
	padding: 1%;
	font-size: 18px;
	&:hover {
		cursor:pointer;
	}
`

export const FlexDiv = styled.div`
	display: flex;
	justify-content: space-evenly;
	@media (max-width: 645px) {
		flex-direction:column;
		justify-content: center;
		align-items: center;
	}
`

export const CenterDiv = styled.div`
	display: flex;
	justify-content: center;
`

export const Submit = styled.div`
	border: solid black 1px;
	max-width: 520px;
	margin: 0 auto;
	width: 100px;
	text-align: center;
	padding: 1%;
	border-radius: 4px;
	background-color: grey;
	color:white;
	&:hover {
		color:grey
		background-color:white;
		cursor:pointer;
	}
`