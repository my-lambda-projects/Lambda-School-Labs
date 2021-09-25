import React, { Component } from 'react';
import styled from 'styled-components';

const TwillioContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const TwillioHeader = styled.h1`
	font-size: 3rem;
	margin: 0 auto 4%;
`;

const StyledLabel = styled.label`
	font-size: 1.6rem;
	margin: 2% auto;
`;

const StyledInput = styled.input`
	width: 100%;
	padding: 12px 20px;
	margin: 0 0 4%;

	&:focus {
		outline: none;
	}
`;

const StyledTextarea = styled.textarea`
	width: 100%;
	padding: 12px 20px;
	margin: 0 0 4%;

	&:focus {
		outline: none;
	}
`;

const TextButton = styled.p`
	font-size: 1.6rem;
	font-weight: bold;
	margin: 4% auto 0%;

	&:hover {
		cursor: pointer;
	}
`;
class Twillio extends Component {
	state = {
		text: {
			recipient: '',
			textmessage: ''
		}
	};

	sendText = _ => {
		const { text } = this.state;
		//pass text message GET variables via query string
		fetch(
			(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
		).catch(err => console.error(err));
	};

	render() {
		const { text } = this.state;
		// const spacer = {
		// 	margin: 8
		// };
		const textArea = {
			borderRadius: 4
		};

		return (
			<TwillioContainer>
				<TwillioHeader> Receive Updates </TwillioHeader>
				<StyledLabel style={{ margin: '0 auto' }}>
					{' '}
					Your Phone Number{' '}
				</StyledLabel>
				<br />
				<StyledInput
					value={text.recipient}
					type="password"
					onChange={e =>
						this.setState({ text: { ...text, recipient: e.target.value } })
					}
				/>
				<StyledLabel> Message </StyledLabel>
				<br />
				<StyledTextarea
					rows={5}
					value={text.textmessage}
					style={textArea}
					onChange={e =>
						this.setState({ text: { ...text, textmessage: e.target.value } })
					}
				/>
				<TextButton onClick={this.sendText}> Send Text </TextButton>
			</TwillioContainer>
		);
	}
}

export default Twillio;
