import { Field, useField } from "formik";

import Error from "elements/Error";

import { TextInput } from "./TextField.style";

export default function TextField({ label, placeholder, error, name }) {
	const [field] = useField(name);

	return (
		<>
			<label htmlFor={field.name}>{label}</label>
			<Field
				type='text'
				id={field.name}
				name={field.name}
				placeholder={placeholder}
				onChange={field.onChange}
				onBlur={field.onBlur}
				component={TextInput}
				{...field}
			/>
			{error && <Error>{error}</Error>}
		</>
	);
}
