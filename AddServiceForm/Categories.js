import { useTranslation } from "next-i18next";

import Checkbox from "elements/Checkbox";
import Label from "elements/Label";
import RadioButton from "elements/RadioButton";
import Select from "elements/Select";

import {
	CategoriesHolder,
	Icon,
	IconHolder,
	NoneMainServiceHolder,
	SelectHolder,
	SubTitle,
	Title
} from "./AddServiceForm.style";

const Categories = ({
	mainServiceId,
	categories,
	servicesList,
	setCategoryName,
	hasMainService,
	formik: { values, setValues, handleChange, handleBlur }
}) => {
	const { t } = useTranslation();

	const onChangeCategory = category => (name, value) => {
		setValues({
			...values,
			[name]: value
		});
		setCategoryName(category);
	};
	return (
		categories && (
			<div>
				<Title>{t("serviceAdd.categories.title")}</Title>
				<SubTitle>{t("serviceAdd.categories.subTitle")}</SubTitle>
				{!mainServiceId && hasMainService && (
					<NoneMainServiceHolder>
						<Checkbox
							label={t("serviceAdd.categories.noneMainService")}
							setValues={setValues}
							values={values}
							customStyle='smallSize'
							name='noneMainService'
						/>
					</NoneMainServiceHolder>
				)}

				<CategoriesHolder>
					{categories.map(category => (
						<RadioButton
							label={category.name}
							key={category.id}
							value={category.id}
							changeOrder
							column
							name='category'
							values={values}
							setValues={onChangeCategory(category.name)}
							disabled={values.noneMainService}
						>
							{category.icon && (
								<IconHolder>
									<Icon src={category.icon} alt={category.name} fill />
								</IconHolder>
							)}
						</RadioButton>
					))}
				</CategoriesHolder>

				{values.category && !values.noneMainService && (
					<SelectHolder>
						<Label>{t("serviceAdd.categories.fields.serviceLabel")}</Label>
						<Select
							id='service'
							name='service'
							type='text'
							defaultValue={values.service}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.land}
							placeholder={t("serviceAdd.categories.fields.service")}
							values={values}
							setValues={setValues}
							options={servicesList[values.category]}
						/>
					</SelectHolder>
				)}
			</div>
		)
	);
};

export default Categories;
