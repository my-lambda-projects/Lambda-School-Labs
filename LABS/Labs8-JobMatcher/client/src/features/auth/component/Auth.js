import React from "react";
import Input from "./Input";

const Auth = props => {
	let btn_name = props.login ? "Login" : "Register";

	let controledClass = props.formValid ? "btn" : "btn disabled";
	let arr = Object.entries(props.state);

	let elements = props.login
		? arr.map((i, idx, arr) =>
				idx === 0 ||
				i[0] === "password2" ||
				i[0] === "is_seeker" ? null : (
					<Input
						key={i[0]}
						{...i[1]}
						button="Login"
						onChange={e => props.inputHandler(e, i[0])}
					/>
				)
		  )
		: arr.map((i, idx, arr) => (
				<Input
					key={i[0]}
					{...i[1]}
					button="Register"
					onChange={e => props.inputHandler(e, i[0])}
				/>
		  ));
	return (
		<form onSubmit={props.handleSubmit} className="main-form-container">
			{props.error && <p> {props.error} </p>}
			{elements}
			<span className="d-block form-hint">
				To conform with our Strong Password policy, you are reqired to
				use a sufficiently strong password.Password must be more than{" "}
				{props.password.validation.minLength} characters.
			</span>
			<button type="submit" className={controledClass + " mt-s"}>
				{btn_name}
			</button>
			{props.fetching && <p> authenticating </p>}
		</form>
	);
};

export default Auth;
