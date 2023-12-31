import clsx from "clsx";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { getSocialMedia } from "selectors";
import {
	addSocialMediaLinks,
	deleteSocialMediaLinks,
	fetchSocialMediaLinksConfig,
	updateSocialMediaLinks
} from "slices";

import Button from "elements/v2/Button";
import Input from "elements/v2/Drawer/Input";
import InputRow from "elements/v2/Drawer/InputRow";
import Slider from "elements/v2/Drawer/Slider";
import TextInfoRow from "elements/v2/Drawer/TextInfoRow";
import Error from "elements/v2/Error";
import Label from "elements/v2/Label";
import SelectContainer from "elements/v2/Select";

import DrawerPlusIcon from "icons/drawerPlus.svg";

const DrawerContact = () => {
	const { t } = useTranslation();
	const [showEditForm, setShowEditForm] = useState(false);
	const { formikValues, selectOptions } = useSelector(getSocialMedia);
	const [links, setLinks] = useState(formikValues);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const dispatch = useDispatch();
	const handleShowEditForm = () => {
		setShowEditForm(true);
	};
	useEffect(() => {
		dispatch(fetchSocialMediaLinksConfig());
	}, []);

	useEffect(() => {
		setLinks(formikValues);
	}, [formikValues]);
	const hideEditForm = () => {
		setShowEditForm(false);
		setLinks(formikValues);
	};
	const formik = useFormik({
		initialValues: {
			links: links
		},
		enableReinitialize: true,
		validateOnMount: true,
		validateOnChange: true,
		validationSchema: Yup.object({
			links: Yup.array().of(
				Yup.object({
					url: Yup.string()
						.url(t("errors.required.link"))
						.max(180, t("errors.maxChars", { max: 180 }))
				})
			)
		}),
		onSubmit: ({ links }) => {
			const { addSocialLinks, updateSocialLinks, deleteSocialLinks } = links.reduce(
				(acc, curr) => {
					const newSocialMedia = {
						url: curr.url,
						social_media: curr.socialMediaId
					};
					if (!curr.socialMediaId) return acc;

					if (curr.id && curr.url) acc.updateSocialLinks.push(newSocialMedia);
					if (!curr.id && curr.url) acc.addSocialLinks.push(newSocialMedia);
					if (curr.id && !curr.url) acc.deleteSocialLinks.push(newSocialMedia);

					return acc;
				},
				{ addSocialLinks: [], updateSocialLinks: [], deleteSocialLinks: [] }
			);
			if (updateSocialLinks.length > 0) dispatch(updateSocialMediaLinks(updateSocialLinks));
			if (addSocialLinks.length > 0) dispatch(addSocialMediaLinks(addSocialLinks));
			if (deleteSocialLinks.length > 0) dispatch(deleteSocialMediaLinks(deleteSocialLinks));
			hideEditForm();
		}
	});

	const changeHandler = (name, value) => {
		formik.setFieldValue(name, value.value);
	};

	const addLinkHandler = () => {
		setLinks(links => [...links, { url: "", socialMediaId: null }]);
	};

	useEffect(() => {
		setSubmitButtonDisabled(Object.keys(formik.errors).length > 0);
	}, [formik.errors]);
	return (
		<Slider title={t("drawer.socialMedia.title")}>
			{!showEditForm && (
				<>
					<div>
						{formikValues &&
							formikValues.map((item, index) => {
								return (
									<TextInfoRow value={item.url} label={item.name} key={index} />
								);
							})}
					</div>
					{formikValues && (
						<div className='flex justify-end pt-lg'>
							<Button
								type='button'
								color='black'
								size='small'
								width='custom'
								onClick={handleShowEditForm}
							>
								{t("drawer.button.edit")}
							</Button>
						</div>
					)}
				</>
			)}
			{showEditForm && (
				<form onSubmit={formik.handleSubmit}>
					{links &&
						links.map((item, index) => {
							const selected = {
								label: formik.values?.links[index]?.name,
								value: formik.values?.links[index]?.socialMediaId
							};
							const linkId = `links.${index}.socialMediaId`;
							const linkUrl = `links.${index}.url`;
							return (
								<div key={index}>
									<InputRow>
										<div>
											<Label
												id={linkId}
												className='!typographySmallRegular text-fg-default'
												label={t("drawer.socialMedia.type.label")}
											/>
											<SelectContainer
												id={linkId}
												name={linkId}
												options={selectOptions}
												placeholder={t(
													"drawer.socialMedia.type.placeholder"
												)}
												changeHandler={changeHandler}
												defaultValue={
													links[index]?.socialMediaId && selected
												}
												value={links[index]?.socialMediaId}
												classNameControl='w-[316px]'
											/>
											{formik?.errors?.links?.length &&
												formik?.errors?.links[index] && (
													<Error
														error={
															formik.errors?.links[index]
																?.socialMediaId
														}
														style='top'
													/>
												)}
										</div>
										<div>
											<Label
												id={linkUrl}
												className='!typographySmallRegular text-fg-default'
												label={t("drawer.socialMedia.value.label")}
											/>
											<Input
												id={linkUrl}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values?.links[index]?.url ?? ""}
												placeholder={t(
													"drawer.socialMedia.value.placeholder"
												)}
												type='text'
												name={linkUrl}
												className={clsx(
													"w-[316px]",
													formik?.errors?.links?.length &&
														formik?.errors?.links[index] &&
														formik.errors?.links[index]?.url &&
														"!border-accent-default"
												)}
											/>
											{formik?.errors?.links?.length &&
												formik?.errors?.links[index] && (
													<Error
														error={formik.errors?.links[index]?.url}
														style='top'
													/>
												)}
										</div>
									</InputRow>
								</div>
							);
						})}
					<div className='flex justify-between pt-lg'>
						<Button
							type='button'
							color='transparent'
							size='small'
							width='custom'
							className='border-2 border-solid border-form-outline'
							onClick={addLinkHandler}
						>
							{t("drawer.socialMedia.button.add")}
							<DrawerPlusIcon alt='' />
						</Button>
						<div className='flex min-w-[316px] justify-between'>
							<Button
								type='button'
								color='black'
								size='small'
								width='custom'
								className='!min-w-[150px] !bg-transparent !text-fg-default'
								onClick={hideEditForm}
							>
								{t("drawer.button.abort")}
							</Button>
							<Button
								type='submit'
								color='black'
								size='small'
								width='custom'
								className='!min-w-[150px]'
								disabled={submitButtonDisabled}
							>
								{t("drawer.button.save")}
							</Button>
						</div>
					</div>
				</form>
			)}
		</Slider>
	);
};

export default DrawerContact;
