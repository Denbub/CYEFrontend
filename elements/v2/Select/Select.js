import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Select from "react-select";

import { SELECT_ARROW, SELECT_VALUE, WHITE } from "colors";

import Error from "elements/v2/Error";
import Label from "elements/v2/Label";

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
			boxShadow: "none",
			outline: "none",
			cursor: "pointer"
		};
	},
	input: provided => {
		return {
			...provided,
			cursor: "pointer"
		};
	}
};

const SelectContainer = ({
	options,
	name,
	placeholder,
	defaultValue,
	changeHandler,
	value,
	isSearchable,
	isClearable,
	label,
	required,
	id,
	error,
	classNameControl
}) => {
	const { t } = useTranslation();

	const [selected, setSelected] = useState(null);
	const setValue = name => option => {
		changeHandler(name, option);
		setSelected(option);
	};

	useEffect(() => {
		!value && selected && setSelected(null);
	}, [value]);

	useEffect(() => {
		if (defaultValue && !selected) {
			setSelected(defaultValue);
		}
	}, [defaultValue]);

	return (
		<div>
			{label && <Label label={label} required={required} id={id} />}
			<Select
				isSearchable={isSearchable}
				menuPlacement='auto'
				name={name}
				isClearable={isClearable}
				classNames={{
					control: state =>
						clsx(
							state.isFocused ? "!border-grey-800" : "!border-border-default",
							"!border-2 !rounded-full !input-normal-regular !text-input-placeholder !h-[40px]",
							classNameControl,
							error && "!border-error-emphasis"
						),
					placeholder: () =>
						"!input-normal-regular !text-input-placeholder !px-md !py-[6px]",
					valueContainer: () => "!p-0",
					input: () => "!input-normal-regular px-md",
					singleValue: () => "!input-normal-regular px-md",
					dropdownIndicator: () => "!dropdown-indicator",
					option: ({ isDisabled, isFocused, isSelected }) =>
						clsx(
							(isSelected || isFocused) &&
								"!bg-accent-default !input-normal-bold !text-white",
							isDisabled ? "!border-grey-800" : "!border-border-default",
							"!input-normal-regular  !px-md py-sm !cursor-pointer"
						),
					menu: () => "!shadow-search-bar !rounded-md bg-white"
				}}
				placeholder={placeholder}
				options={options}
				onChange={setValue(name)}
				value={selected}
				noOptionsMessage={({ inputValue }) => (!inputValue ? t("select.noOptions") : "")}
				styles={colourStyles}
			/>
			<Error error={error} />
		</div>
	);
};

export default SelectContainer;
