import clsx from "clsx";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { getSocialMedia, getSocialMediaLinksConfig } from "selectors";
import { addTeamMemberJson, updateTeamMemberJson } from "slices";

import Button from "elements/v2/Button";
import Input from "elements/v2/Drawer/Input";
import InputRow from "elements/v2/Drawer/InputRow";
import Slider from "elements/v2/Drawer/Slider";
import Error from "elements/v2/Error";
import Label from "elements/v2/Label";
import SelectContainer from "elements/v2/Select";
import Textarea from "elements/v2/Textarea";

const AddTeamMemberForm = ({ member, loading, hideEditForm, showCloseButton = true }) => {
	const {
		id,
		name = "",
		last_name: lastName = "",
		position = "",
		summary = "",
		social_media: socialMedia
	} = member;
	const { selectOptions } = useSelector(getSocialMedia);
	const socialMediaLinksConfig = useSelector(getSocialMediaLinksConfig);
	const { t } = useTranslation();
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			name,
			lastName,
			position,
			summary,
			socialMedia
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string()
				.max(40, t("errors.maxChars", { max: 40 }))
				.required(t("errors.required.text")),
			lastName: Yup.string()
				.max(40, t("errors.maxChars", { max: 40 }))
				.required(t("errors.required.text")),
			position: Yup.string().max(40, t("errors.maxChars", { max: 40 })),
			summary: Yup.string().max(180, t("errors.maxChars", { max: 180 })),
			socialMedia: Yup.array().of(
				Yup.object({
					url: Yup.string()
						.url(t("errors.required.link"))
						.max(180, "Must be 180 characters or less")
				})
			)
		}),
		onSubmit: ({ name, lastName, position, summary, socialMedia }) => {
			const uploadParams = {
				name,
				last_name: lastName,
				position,
				social_media: socialMedia.filter(element => element?.id && element.url),
				summary
			};
			if (id) {
				dispatch(
					updateTeamMemberJson({
						...uploadParams,
						id
					})
				);
			} else {
				dispatch(addTeamMemberJson(uploadParams));
			}
			hideEditForm();
		}
	});

	const selectChangeHandler = (name, value) => {
		formik.setFieldValue(name, value.value);
	};

	useEffect(() => {
		setSubmitButtonDisabled(loading || Object.keys(formik.errors).length > 0);
	}, [loading, formik.errors]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<InputRow>
				<Label
					id='name'
					className='!typographySmallRegular text-fg-default'
					required
					label={t("drawer.team.firstName.label")}
				/>
				<Input
					id='name'
					required
					className={formik.errors.name && "!border-accent-default"}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
					placeholder={t("drawer.team.firstName.placeholder")}
					type='text'
					name='name'
				/>
				<Error error={formik.errors.name} style='top' />
			</InputRow>
			<InputRow>
				<Label
					id='lastName'
					className='!typographySmallRegular text-fg-default'
					required
					label={t("drawer.team.lastName.label")}
				/>
				<Input
					id='lastName'
					required
					className={formik.errors.lastName && "!border-accent-default"}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.lastName}
					placeholder={t("drawer.team.lastName.placeholder")}
					type='text'
					name='lastName'
				/>
				<Error error={formik.errors.lastName} style='top' />
			</InputRow>

			<InputRow>
				<Label
					id='position'
					className='!typographySmallRegular text-fg-default'
					required
					label={t("drawer.team.role.label")}
				/>
				<Input
					id='position'
					required
					className={formik.errors.position && "!border-accent-default"}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.position}
					placeholder={t("drawer.team.role.placeholder")}
					type='text'
					name='position'
				/>
				<Error error={formik.errors.position} style='top' />
			</InputRow>
			<InputRow className='items-start'>
				<Label
					id='summary'
					className='!typographySmallRegular text-fg-default'
					label={t("drawer.team.summary.label")}
					required
				/>
				<Textarea
					id='summary'
					name='summary'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					defaultValue={formik.values.summary}
					placeholder={t("drawer.team.summary.placeholder")}
					required
					className={clsx(
						formik.errors.summary && "!border-accent-default",
						" !typographyInputNormalRegular"
					)}
				/>
				<Error error={formik.errors.summary} style='top' />
			</InputRow>
			<Slider title={t("drawer.team.titleSocialMedia")}>
				{[...Array(4)].map((_, index) => {
					const socialMediaId = `socialMedia.${index}.id`;
					const socialMediaUrl = `socialMedia.${index}.url`;
					let selected = null;
					if (formik.values?.socialMedia[index]?.id) {
						selected = {
							label: socialMediaLinksConfig[formik.values?.socialMedia[index]?.id]
								?.name,
							value: formik.values?.socialMedia[index]?.id
						};
					}

					return (
						<div key={index}>
							<InputRow>
								<div>
									<Label
										id={socialMediaId}
										className='!typographySmallRegular text-fg-default'
										label={t("drawer.socialMedia.type.label")}
									/>
									<SelectContainer
										options={selectOptions}
										id={socialMediaId}
										placeholder={t("drawer.socialMedia.type.placeholder")}
										defaultValue={selected}
										name={socialMediaId}
										changeHandler={selectChangeHandler}
										classNameControl='!w-[316px]'
									/>
								</div>
								<div>
									<Label
										id={socialMediaUrl}
										className='!typographySmallRegular text-fg-default'
										label={t("drawer.socialMedia.value.label")}
									/>
									<Input
										id={socialMediaUrl}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values?.socialMedia[index]?.url}
										placeholder={t("drawer.socialMedia.value.placeholder")}
										type='text'
										name={socialMediaUrl}
										className={clsx(
											"w-[316px]",
											formik?.errors?.socialMedia?.length &&
												formik?.errors?.socialMedia[index] &&
												formik.errors?.socialMedia[index]?.url &&
												"!border-accent-default"
										)}
									/>
									{formik?.errors?.socialMedia?.length &&
										formik?.errors?.socialMedia[index] && (
											<Error
												error={formik.errors?.socialMedia[index]?.url}
												style='top'
											/>
										)}
								</div>
							</InputRow>
						</div>
					);
				})}
			</Slider>
			<div
				className={clsx("flex pt-lg", showCloseButton ? "justify-between" : "justify-end")}
			>
				{showCloseButton && (
					<Button
						type='button'
						color='black'
						size='small'
						width='custom'
						className='!bg-transparent !text-fg-default'
						onClick={hideEditForm}
					>
						{t("drawer.button.abort")}
					</Button>
				)}
				<Button
					type='submit'
					color='black'
					size='small'
					width='custom'
					disabled={submitButtonDisabled}
				>
					{t("saveButton.text")}
				</Button>
			</div>
		</form>
	);
};
export default AddTeamMemberForm;
