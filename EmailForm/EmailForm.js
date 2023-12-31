import { useTranslation } from "next-i18next";

import Button from "elements/v2/Button";
import Error from "elements/v2/Error";
import Input from "elements/v2/Input";

const EmailForm = ({
	errors,
	isSubmitting,
	value,
	touched,
	handleBlur,
	setFieldValue,
	codeHandlingError
}) => {
	const { t } = useTranslation();

	const formatInput = event => {
		setFieldValue("email", event.target.value.trim());
	};

	return (
		<div className='mb-[40px]'>
			<div className='mb-lg'>
				<Input
					name='email'
					type='text'
					onChange={formatInput}
					onBlur={handleBlur}
					placeholder={t("registrationForm.fields.email.placeholder")}
					value={value}
					label={t("registrationForm.fields.email.label")}
					required
					className='h-[48px] w-full rounded-full border-2 focus:border-grey-800'
					error={touched.email && errors.email}
				/>
			</div>
			<Button hasArrowRight type='submit' className='h-[48px]'>
				{t("nextButton.text")}
			</Button>
			{codeHandlingError && <Error error={codeHandlingError} />}
			<p className='typographyCaptionRegular mt-[32px] text-center text-fg-muted'>
				{t("registrationForm.description")}
			</p>
		</div>
	);
};
export default EmailForm;
