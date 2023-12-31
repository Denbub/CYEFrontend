import { landList } from "constant";

import Button from "elements/v2/Button";
import Input from "elements/v2/Input";
import Select from "elements/v2/Select";

import InputHolder from "./InputHolder";

const FirstStep = ({ formik, t, nextClickHandler }) => {
	const selectChangeHandler = (name, option) => {
		formik.setFieldValue(name, option);
	};

	return (
		<form>
			<InputHolder>
				<Input
					id='name'
					name='name'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					placeholder='Vorname eingeben...'
					className='w-full rounded-full border-2'
					error={formik.touched.name && formik.errors.name}
					label={t("companyRegistration.fields.name")}
					required
				/>
			</InputHolder>

			<InputHolder>
				<Input
					id='lastName'
					name='lastName'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.lastName}
					placeholder='Nachname eingeben...'
					className='w-full rounded-full border-2'
					error={formik.touched.lastName && formik.errors.lastName}
					label={t("companyRegistration.fields.lastName")}
					required
				/>
			</InputHolder>

			<InputHolder>
				<Select
					id='country'
					name='country'
					type='text'
					defaultValue={formik.values.country}
					changeHandler={selectChangeHandler}
					onBlur={formik.handleBlur}
					value={formik.values.land}
					placeholder='Land auswählen...'
					values={formik.values}
					setValues={formik.setValues}
					options={landList}
					className='w-full rounded-full border-2'
					error={formik.touched.country && formik.errors.country}
					label={t("companyRegistration.fields.country")}
					required
				/>
			</InputHolder>
			<Button
				text={t("nextButton.text")}
				hasArrowRight
				className='xl:mt[88px] mt-[90px] mb-[104px]'
				onClick={nextClickHandler}
			/>
		</form>
	);
};

export default FirstStep;
