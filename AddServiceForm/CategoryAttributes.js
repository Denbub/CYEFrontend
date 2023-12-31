import { useTranslation } from "next-i18next";

import { attributesGroupsType } from "constant";
import CheckboxTemplate from "./CheckboxTemplate";
import DropdownTemplate from "./DropdownTemplate";
import TextInputTemplate from "./TextInputTemplate";

import {
	CategoryAttributesTitle,
	CheckboxTemplateTitle,
	Template,
	TemplateWrapper,
	Title
} from "./AddServiceForm.style";

const getAttributesGroups = (attributes_group, setValues, values, handleChange, handleBlur) => {
	const { type, service_attributes, name, id } = attributes_group;
	switch (type) {
		case attributesGroupsType.checkboxes:
			return (
				<>
					<Template key={attributes_group.id} count='3' checkboxes noGap>
						<CheckboxTemplateTitle>{name}</CheckboxTemplateTitle>
					</Template>

					<Template key={attributes_group.id} count='1' checkboxes>
						<CheckboxTemplate
							name={name}
							serviceAttributes={service_attributes}
							setValues={setValues}
							values={values}
							handleChange={handleChange}
							handleBlur={handleBlur}
						/>
					</Template>
				</>
			);

		case attributesGroupsType.textInputs:
			return (
				<Template
					key={attributes_group.id}
					count={
						attributes_group.service_attributes.length > 3
							? 3
							: attributes_group.service_attributes.length
					}
				>
					<TextInputTemplate
						values={values}
						handleChange={handleChange}
						handleBlur={handleBlur}
						serviceAttributes={service_attributes}
						setValues={setValues}
					/>
				</Template>
			);

		case attributesGroupsType.dropdown:
			return (
				<Template key={attributes_group.id} count='1'>
					<DropdownTemplate
						serviceAttributes={service_attributes}
						setValues={setValues}
						values={values}
						name={name}
						id={id}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				</Template>
			);
	}
};
const CategoryAttributes = ({
	templates,
	formik: { values, setValues, handleChange, handleBlur, setFieldValue }
}) => {
	const { t } = useTranslation();

	const template = templates[values.service.value];

	return (
		<div>
			<Title>{t("serviceAdd.categoryAttributes.title")}</Title>
			<CategoryAttributesTitle>{values.service.label}</CategoryAttributesTitle>
			{template && (
				<TemplateWrapper key={template.id}>
					<div>
						{template.attributes_groups.map(attributes_group =>
							getAttributesGroups(
								attributes_group,
								setValues,
								values,
								handleChange,
								handleBlur,
								setFieldValue
							)
						)}
					</div>
				</TemplateWrapper>
			)}
		</div>
	);
};

export default CategoryAttributes;
