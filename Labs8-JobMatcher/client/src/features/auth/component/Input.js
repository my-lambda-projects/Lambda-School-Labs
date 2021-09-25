import React from "react";

const Input = props => {
	let {
		id,
		touch,
		errors,
		valid,
		label,
		type,
		controlClass,
		placeholder,
		value,
		onChange,
		name,
		validation
	} = props;

	controlClass =
		!touch || valid
			? controlClass + " is-valid"
			: controlClass + " is-invalid";

	const strengthClass = [
		"strength-meter mt-2",
		value && value.length > 0 ? "visible" : "invisible"
	]
		.join(" ")
		.trim();
	let strengthMeter =
		type === "password" ? (
			<div className={strengthClass}>
				<div
					className="strength-meter-fill"
					data-strength={validation.strength}
				/>
			</div>
		) : null;
	return value !== undefined ? (
		<div className="form-group">
			{/** Render the first error if there are any errors **/}
			{!valid && errors.length > 0 && (
				<div className="error form-hint font-weight-bold text-right m-0 mb-2">
					{errors[errors.length - 1]}
				</div>
			)}
			{strengthMeter}

			<input
				type={type}
				className={controlClass}
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete="off"
			/>
			{type === "checkbox" ? (
				<label htmlFor={id} className="form-label-checkbox">
					{label}
				</label>
			) : (
				<label htmlFor={id} className="form-label">
					{label}
				</label>
			)}
		</div>
	) : null;
};
export default Input;
