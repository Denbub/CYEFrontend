import { useTranslation } from "next-i18next";

import Error from "elements/Error";
import Input from "elements/Input";
import Label from "elements/Label";
import TextArea from "elements/TextArea";

import { InputHolder, SubTitle, Title } from "./AddServiceForm.style";

const ServiceDescription = ({
	categoryName,
	formik: { values, handleChange, handleBlur, touched, errors },
	required
}) => {
	const { t } = useTranslation();

	return (
		<div>
			<Title>{t("serviceAdd.serviceDescription.title")}</Title>
			<SubTitle>{categoryName}</SubTitle>
			<InputHolder>
				<Label htmlFor='name'>
					{t(
						required
							? "serviceAdd.serviceDescription.fields.serviceName"
							: "serviceAdd.serviceDescription.fields.serviceNameRequired"
					)}
				</Label>
				<Input
					id='serviceName'
					name='serviceName'
					type='text'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.serviceName}
				/>
				{touched.serviceName && errors.serviceName ? (
					<Error>{errors.serviceName}</Error>
				) : null}
			</InputHolder>
			<InputHolder>
				<Label htmlFor='serviceDescription'>
					{t("serviceAdd.serviceDescription.fields.serviceDescription")}
				</Label>
				<TextArea
					id='serviceDescription'
					name='serviceDescription'
					type='text'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.serviceDescription}
				/>
				{touched.serviceDescription && errors.serviceDescription ? (
					<Error>{errors.serviceDescription}</Error>
				) : null}
			</InputHolder>
		</div>
	);
};

export default ServiceDescription;
