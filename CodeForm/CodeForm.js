import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
import * as yup from "yup";

import Button from "elements/v2/Button";
import Checkbox from "elements/v2/Checkbox";
import Input from "elements/v2/Input";

const initialValues = {
	number: ""
};

const rememberMe = Cookies.get("rememberMe");

const CodeForm = ({ resend, handleCode, codeHandlingError }) => {
	const { t } = useTranslation();

	const validationSchemas = yup.object().shape({
		number: yup.string().required()
	});

	const handleResend = () => {
		resend();
	};

	const setRememberMe = value => {
		Cookies.set("rememberMe", value["rememberMe"]);
	};
	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchemas}
				onSubmit={async values => {
					handleCode(values.number.trim());
				}}
			>
				{({ isSubmitting, values, handleBlur, handleChange }) => (
					<Form id='newShowForm'>
						<div className='mb-lg'>
							<Input
								name='number'
								type='text'
								required
								onBlur={handleBlur}
								onChange={handleChange}
								placeholder={t("codeForm.fields.code.placeholder")}
								value={values.number}
								label={t("codeForm.fields.code.label")}
								className=' h-[48px] w-full rounded-full border-2 focus:border-grey-800'
								error={codeHandlingError}
							/>
						</div>

						<Button
							type='submit'
							disabled={isSubmitting}
							hasArrowRight
							className='mb-[32px] h-[48px]'
						>
							{t("codeForm.button.send")}
						</Button>
						<div className='mb-[32px]'>
							<Checkbox
								className='typographySmallRegular'
								label={t("codeForm.rememberOnDevice")}
								name='rememberMe'
								active={rememberMe}
								setFieldValue={setRememberMe}
							/>
						</div>

						<div className='border-t border-border-default pt-[32px] text-center'>
							<p className='typographySmallRegular'>{t("codeForm.resubmitFirst")}</p>

							<a
								className='typographySmallRegular cursor-pointer text-accent-default'
								onClick={handleResend}
							>
								{t("codeForm.resubmitSecond")}
							</a>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default CodeForm;
