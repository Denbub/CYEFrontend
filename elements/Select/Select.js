import Select from "react-select";

import { SELECT_ARROW, SELECT_BORDER, SELECT_OPTION_BG, SELECT_VALUE, WHITE } from "colors";

const colourStyles = {
	placeholder: defaultStyles => {
		return {
			...defaultStyles,
			color: SELECT_VALUE
		};
	},
	indicatorSeparator: () => {
		return {
			display: "none"
		};
	},
	indicatorsContainer: (base, state) => {
		const value = state.getValue();
		return {
			...base,
			svg: {
				fill: value.length === 0 || value[0].isDisabled ? WHITE : SELECT_ARROW
			}
		};
	},
	dropdownIndicator: base => {
		return {
			...base,
			svg: {
				fill: SELECT_ARROW
			}
		};
	},
	singleValue: (provided, state) => {
		const value = state.getValue();
		return {
			...provided,
			cursor: "pointer",
			color: value.length === 0 || value[0].isDisabled ? WHITE : SELECT_ARROW
		};
	},
	control: styles => {
		return {
			...styles,
			fontSize: "14px",
			fontFamily: "Poppins",
			backgroundColor: "tranparent",
			padding: "0px 10px",
			height: "50px",
			boxShadow: "none",
			outline: "none",
			border: `1.5px solid ${SELECT_BORDER}`,
			borderRadius: "100px",
			margin: "0 0 9px",
			width: "100%",
			cursor: "pointer"
		};
	},
	input: provided => {
		return {
			...provided,
			cursor: "pointer",
			color: WHITE
		};
	},
	option: (styles, { isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: isDisabled
				? "red"
				: isFocused || isSelected
				? WHITE
				: SELECT_OPTION_BG,
			color: isDisabled ? "red" : isFocused || isSelected ? SELECT_OPTION_BG : WHITE,
			margin: 0,
			cursor: isDisabled ? "not-allowed" : "pointer"
		};
	}
};

const SelectContainer = ({
	options,
	name,
	setValues,
	values,
	placeholder,
	defaultValue,
	changeHandler,
	value
}) => {
	const setValue = name => option => {
		if (changeHandler) {
			changeHandler(name, option);
		} else {
			setValues({
				...values,
				[name]: option
			});
		}
	};
	return (
		<Select
			menuPlacement='auto'
			name={name}
			className='swiper-no-swiping'
			placeholder={placeholder}
			options={options}
			filterOption={false}
			onChange={setValue(name)}
			defaultValue={value || defaultValue}
			styles={colourStyles}
		/>
	);
};

export default SelectContainer;
