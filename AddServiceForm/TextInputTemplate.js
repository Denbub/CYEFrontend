import Input from "elements/Input";
import Label from "elements/Label";
import TextArea from "elements/TextArea";

const TextInputTemplate = ({ serviceAttributes, setValues, values, handleBlur }) => {
	const onChange = e => {
		const serviceAttributes = Object.assign({}, values.serviceAttributes);
		serviceAttributes[e.target.name] = e.target.value;

		setValues({ ...values, serviceAttributes });
	};

	return (
		<>
			{serviceAttributes.map(serviceAttribute => (
				<div key={serviceAttribute.id}>
					<Label htmlFor={serviceAttribute.id}>{serviceAttribute.name}</Label>
					{serviceAttribute.type !== "longText" ? (
						<Input
							id={serviceAttribute.id}
							name={serviceAttribute.id}
							type={serviceAttribute.type === "text" ? "text" : "number"}
							onChange={onChange}
							onBlur={handleBlur}
							placeholder={serviceAttribute.placeholder}
							value={values.serviceAttributes[serviceAttribute.id]}
						/>
					) : (
						<TextArea></TextArea>
					)}
				</div>
			))}
		</>
	);
};

export default TextInputTemplate;
