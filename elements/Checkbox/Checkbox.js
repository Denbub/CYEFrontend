import { useState } from "react";

import Error from "elements/Error";

import CheckedIcon from "icons/checked.svg";

import { Checkbox, CheckboxHolder, CheckboxLabel, CheckboxWrapper } from "./Checkbox.style";

const CheckboxContainer = ({
	label,
	active,
	customStyle,
	setValues,
	name,
	values,
	changeHandler,
	error
}) => {
	const [checked, setChecked] = useState(active);

	const handleClick = e => {
		setChecked(prev => {
			if (changeHandler) {
				changeHandler({ [name]: !prev });
			} else {
				setValues({
					...values,
					[name]: !prev
				});
			}

			return !prev;
		});
	};
	return (
		<CheckboxWrapper>
			<CheckboxHolder onClick={handleClick}>
				<Checkbox>{checked && <CheckedIcon />}</Checkbox>
				<CheckboxLabel
					dangerouslySetInnerHTML={{ __html: label }}
					customStyle={customStyle}
				/>
			</CheckboxHolder>
			{error && <Error>{error}</Error>}
		</CheckboxWrapper>
	);
};
export default CheckboxContainer;
