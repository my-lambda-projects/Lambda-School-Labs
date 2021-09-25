import styled from 'styled-components'

export const Card = styled.div`
	padding: 1%;
`

export const ListContainer = styled.div`
	max-width: 1000px;
	margin: 0 auto;
`

export const FlexList = styled.div`

`


export const FlexDiv = styled.div`
	border: solid black 1px;
	max-width: 800px;
	margin: 15px auto;
	display:flex;
	justify-content: space-evenly;
	align-items: center;
`

export const ViewEvent = styled.p`
	border: solid black 1px;
	margin-top: 10px;
	padding: .5%;
	width: 100px;
	text-align: center;
	border-radius: 4px;
	background-color:grey
	color: white;
	&:hover {
		background-color: white;
		color: grey;
	}
`

export const DispayComments = styled.div`
	margin-top: 8px;
	text-align: center;
`

export const CreateLink = styled.div`
	color: white;
	background-color: grey;
	border: solid black 1px;
	border-radius: 4px;
	width: 100px;
	text-align: center;
	&:hover {
		background-color: white;
		color:grey
		cursor: pointer;
	}
`

export const ContainLink = styled.div`
	max-width: 800px;
	margin: 0 auto;
`