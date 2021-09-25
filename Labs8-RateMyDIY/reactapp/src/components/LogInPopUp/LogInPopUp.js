import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LogInPopUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: this.props.toggleLogInPopUp,
			loginUrl:
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signin`
		};

		// this.toggle = this.props.toggleLogInPopUp;
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
		this.props.searchWithoutLogin();
	};

	render() {
		console.log(this.props);
		return (
			<div>
				{/* <Button color="primary" onClick={this.toggle}>
					{this.props.buttonLabel}
				</Button> */}
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>Please log in</ModalHeader>
					<ModalBody>
						Hey there, RateMyDIY works best when logged in. You can go to our
						log in page below.
					</ModalBody>
					<ModalFooter>
						<Button color="primary">
							<a style={{ color: 'white' }} href={this.state.loginUrl}>
								Login
							</a>
						</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>
							No thanks
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default LogInPopUp;
