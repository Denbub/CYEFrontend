import { useTranslation } from "next-i18next";

import Error from "elements/Error";
import Input from "elements/Input";
import Label from "elements/Label";
import TextArea from "elements/TextArea";

import { InputHolder, SubTitle, Title } from "./AddServiceForm.style";

const CompanyDescription = ({
	formik: { values, setValues, handleChange, handleBlur, touched, errors },
	categoryName
}) => {
	const { t } = useTranslation();

	return (
		<div>
			<Title>{t("serviceAdd.companyDescription.title")}</Title>
			<SubTitle>{categoryName}</SubTitle>
			<InputHolder>
				<Label htmlFor='name'>{t("serviceAdd.companyDescription.fields.name")}</Label>
				<Input
					id='name'
					name='name'
					type='text'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.name}
				/>
				{touched.name && errors.name ? <Error>{errors.name}</Error> : null}
			</InputHolder>
			<InputHolder>
				<Label htmlFor='companyDescription'>
					{t("serviceAdd.companyDescription.fields.companyDescrition")}
				</Label>
				<TextArea
					id='companyDescription'
					name='companyDescription'
					type='text'
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.companyDescription}
				/>
				{touched.companyDescription && errors.companyDescription ? (
					<Error>{errors.companyDescription}</Error>
				) : null}
			</InputHolder>
		</div>
	);
};

export default CompanyDescription;
