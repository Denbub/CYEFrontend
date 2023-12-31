import Checkbox from "elements/Checkbox";

import { CheckboxHolder } from "./AddServiceForm.style";

const CheckboxTemplate = ({ serviceAttributes, setValues, values }) => {
	const changeHandler = name => value => {
		const serviceAttributes = Object.assign({}, values.serviceAttributes);
		serviceAttributes[name] = value[name];

		setValues({ ...values, serviceAttributes });
	};
	return (
		<CheckboxHolder>
			{serviceAttributes.map(({ id, name }) => (
				<Checkbox
					key={id}
					label={name}
					setValues={changeHandler}
					changeHandler={changeHandler(id)}
					values={values}
					customStyle='smallSize'
					name={id}
				/>
			))}
		</CheckboxHolder>
	);
};

export default CheckboxTemplate;
