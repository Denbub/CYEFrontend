import Select from "elements/Select";
import { useMemo, useState } from "react";

import Label from "elements/Label";

const DropdownTemplate = ({
	serviceAttributes,
	setValues,
	values,
	name,
	id,
	handleChange,
	handleBlur
}) => {
	const [currentValue, setCurrentValue] = useState();
	const serviceAttributesList = useMemo(() => {
		const dropdownList = serviceAttributes.reduce((acc, attr) => {
			const dropdownOption = {
				label: attr.name,
				value: attr.id,
				isDisabled: false
			};
			if (values.serviceAttributes[attr.id]) {
				setCurrentValue(dropdownOption);
			}

			acc.push(dropdownOption);
			return acc;
		}, []);
		return dropdownList;
	}, [serviceAttributes, values.serviceAttributes]);

	const onChange = (name, value) => {
		const serviceAttributesList = Object.assign({}, values.serviceAttributes);

		serviceAttributes.map(attr => {
			if (serviceAttributesList[attr.id]) {
				serviceAttributesList[attr.id] = null;
			}
		});

		serviceAttributesList[value.value] = true;
		setCurrentValue(value);
		setValues({ ...values, serviceAttributes: serviceAttributesList });
	};

	return (
		<div>
			<Label htmlFor='name'>{name}</Label>
			<Select
				id={id}
				name={id}
				onChange={handleChange}
				onBlur={handleBlur}
				value={currentValue}
				placeholder='value'
				values={values}
				setValues={onChange}
				changeHandler={onChange}
				options={serviceAttributesList}
			/>
		</div>
	);
};

export default DropdownTemplate;
