import styled from 'styled-components'

export const Container = styled.div`
	max-width: 800px;
	margin: 30px auto;
`

export const EditBtn = styled.p`
	border: solid black 1px;
	display: inline-block;
	border-radius: 4px;
	padding: .5%;
	background-color: grey;
	color: white;
	&:hover {
		background-color: white;
		color: grey;
	}
`

export const FlexEnd = styled.div`
	display:flex;
	justify-content: flex-end;
`