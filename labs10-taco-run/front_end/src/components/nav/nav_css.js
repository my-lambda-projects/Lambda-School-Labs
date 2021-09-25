import styled from 'styled-components'

export const MainNav = styled.nav`
	display: flex;
	justify-content: space-between;
	max-width: 800px;
	margin: 0 auto;
	> div {
		display: flex;
		justify-content: center;
		text-align: center;
		@media (max-width: 645px) {
			flex-direction: column;
			text-align: center;
		}
	}
	@media (max-width: 645px){
		flex-direction: column;
	}
`
export const RightNav = styled.div`
	> p {
		font-family: 'Roboto', sans-serif;
		font-size: 1.2rem;
		min-width: 130px;
		padding: 10px .5%;
		box-size:border-box;
		&:hover {
			background-color: #eaeaea;
			cursor: pointer;
		}
		@media (max-width: 645px) {
			font-size: 1.8rem;
		}
	}
	@media (max-width: 645px) {
		flex-direction: column;
	}
`

export const LeftNav = styled.div`
	> p {
		font-family: 'Roboto', sans-serif;
		font-size: 1.2rem;
		min-width: 130px;
		padding: 10px .5%;
		&:hover {
			background-color: #eaeaea;
			cursor: pointer;
		}
		
		@media (max-width: 645px){
			font-size: 1.8rem;
		}
	}
`