import Button from "elements/v2/Button";
import Input from "elements/v2/Input";

import InputHolder from "./InputHolder";

const SecondStep = ({ formik, t, backClickHandler, nextClickHandler }) => {
	return (
		<form>
			<InputHolder>
				<Input
					id='companyName'
					name='companyName'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.companyName}
					placeholder={"Name eingeben..."}
					className=' w-full rounded-full border-2'
					error={formik.touched.companyName && formik.errors.companyName}
					label={t("companyRegistration.fields.companyName")}
					required
				/>
			</InputHolder>

			<InputHolder>
				<Input
					id='email'
					name='email'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					placeholder='Ihre E-Mail...'
					className=' w-full rounded-full border-2'
					error={formik.touched.email && formik.errors.email}
					label={t("companyRegistration.fields.email")}
					required
				/>
			</InputHolder>

			<InputHolder>
				<Input
					id='phone'
					name='phone'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.phone}
					placeholder='Ihre Telefonnummer...'
					className=' w-full rounded-full border-2'
					error={formik.touched.phone && formik.errors.phone}
					label={t("companyRegistration.fields.phone")}
					required
				/>
			</InputHolder>
			<Button
				text={t("nextButton.text")}
				hasArrowRight
				className='xl:mt[88px] mt-[90px]  mb-lg'
				onClick={nextClickHandler}
			/>
			<Button
				text={t("backButton.text")}
				hasArrowLeft
				color='black'
				className='mb-[40px]'
				onClick={backClickHandler}
			/>
		</form>
	);
};

export default SecondStep;
