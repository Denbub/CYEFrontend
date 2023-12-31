import {
	CheckedIcon,
	Input,
	RadioButtonHolder,
	RadioButtonInput,
	RadioButtonLabel
} from "./RadioButton.style";

const RadioButton = ({
	label,
	children,
	changeOrder,
	name,
	value,
	setValues,
	values,
	column,
	disabled
}) => {
	const hadleChange = e => {
		setValues(name, e.currentTarget.value);
	};

	return (
		<RadioButtonHolder column={column}>
			<RadioButtonInput changeOrder={changeOrder} htmlFor={`${name}_${value}`}>
				{values[name] === value && <CheckedIcon />}
			</RadioButtonInput>
			<Input
				id={`${name}_${value}`}
				type='radio'
				value={value}
				name={name}
				onChange={hadleChange}
				checked={values[name] === value}
				disabled={disabled}
			/>

			<RadioButtonLabel
				changeOrder={changeOrder}
				htmlFor={`${name}_${value}`}
				column={column}
				disabled={disabled}
			>
				{children}
				{label}
			</RadioButtonLabel>
		</RadioButtonHolder>
	);
};
export default RadioButton;
