import clsx from "clsx";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { getCompany } from "selectors";
import { updateCompany, updateService } from "slices";

import Button from "elements/v2/Button";
import Input from "elements/v2/Drawer/Input";
import InputRow from "elements/v2/Drawer/InputRow";
import Slider from "elements/v2/Drawer/Slider";
import TextInfoRow from "elements/v2/Drawer/TextInfoRow";
import Error from "elements/v2/Error";
import Label from "elements/v2/Label";
import Textarea from "elements/v2/Textarea";
import useAutosuggest from "hooks/useAutosuggest";

const DrawerLocation = ({ serviceProfile, bingApiReady }) => {
	const { locationTitle, locationDescription, address, loading, location, radius } =
		useSelector(getCompany);
	const serviceRadius = useSelector(state => state.service.radius);

	const { t } = useTranslation();

	const [editForm, setEditForm] = useState(false);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

	const inputRef = useRef(null);
	const suggestionsContainerRef = useRef(null);

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			title: locationTitle,
			description: locationDescription,
			address,
			radius: serviceProfile ? serviceRadius : radius,
			location
		},
		enableReinitialize: true,
		validateOnMount: true,
		validateOnChange: true,
		validationSchema: Yup.object({
			title: Yup.string()
				.max(180, t("errors.maxChars", { max: 180 }))
				.required(t("errors.required.text")),
			description: Yup.string()
				.max(180, t("errors.maxChars", { max: 180 }))
				.required(t("errors.required.text")),
			address: Yup.string()
				.max(180, t("errors.maxChars", { max: 180 }))
				.required(t("errors.required.text")),
			radius: Yup.number()
				.max(1000, t("errors.maxChars", { max: 1000 }))
				.integer(t("errors.noDecimal"))
				.required(t("errors.required.text"))
		}),
		onSubmit: ({ title, description, address, radius, location }) => {
			const payload = {
				location_title: title,
				location_description: description,
				location_address: address,
				service_radius: radius
			};
			if (location) {
				payload.location_point = location;
			}

			dispatch(updateCompany(payload));
			if (serviceProfile) {
				dispatch(updateService(payload));
			}
			setEditForm(false);
		}
	});

	useAutosuggest({
		inputRef,
		suggestionsContainerRef,
		onAddressSelect: ({ address, location }) => {
			formik.setFieldValue("address", address);
			formik.setFieldValue("location", location);
		},
		bingApiReady
	});

	const showEditForm = () => {
		setEditForm(true);
	};
	const hideEditForm = () => {
		setEditForm(false);
	};

	useEffect(() => {
		setSubmitButtonDisabled(loading || Object.keys(formik.errors).length > 0);
	}, [loading, formik.errors]);

	return (
		<Slider title={t("drawer.location.title")}>
			{editForm && (
				<form onSubmit={formik.handleSubmit}>
					<InputRow>
						<Label
							id='title'
							className='!typographySmallRegular text-fg-default'
							required
							label={t("drawer.location.name.label")}
						/>
						<Input
							id='title'
							required
							className={
								formik.errors.title &&
								formik.touched.title &&
								"!border-accent-default"
							}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.title}
							placeholder={t("drawer.location.name.placeholder")}
							type='text'
							name='title'
						/>
						{formik.touched.title && <Error error={formik.errors.title} style='top' />}
					</InputRow>
					<InputRow>
						<Label
							id='address'
							className='!typographySmallRegular text-fg-default'
							label={t("drawer.location.address.label")}
						/>
						<div ref={suggestionsContainerRef}>
							<Input
								id='address'
								className={
									formik.errors.address &&
									formik.touched.address &&
									"!border-accent-default"
								}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.address}
								placeholder={t("drawer.location.address.placeholder")}
								type='link'
								name='address'
								innerRef={inputRef}
							/>
						</div>
						{formik.touched.address && (
							<Error error={formik.errors.address} style='top' />
						)}
					</InputRow>
					<InputRow className='items-start'>
						<Label
							id='description'
							className='!typographySmallRegular text-fg-default'
							label={t("drawer.location.description.label")}
							required
						/>
						<Textarea
							id='description'
							name='description'
							type='description'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							defaultValue={formik.values.description}
							placeholder={t("drawer.location.description.placeholder")}
							required
							className={clsx(
								formik.errors.description &&
									formik.touched.description &&
									"!border-accent-default",
								" !typographyInputNormalRegular"
							)}
						/>
						{formik.touched.description && (
							<Error error={formik.errors.description} style='top' />
						)}
					</InputRow>
					<InputRow>
						<Label
							id='radius'
							className='!typographySmallRegular text-fg-default'
							label={t("radius")}
						/>
						<Input
							id='radius'
							className={
								formik.errors.radius &&
								formik.touched.radius &&
								"!border-accent-default"
							}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.radius}
							placeholder={t("radius")}
							type='link'
							name='radius'
						/>

						{formik.touched.radius && (
							<Error error={formik.errors.radius} style='top' />
						)}
					</InputRow>
					<div className='flex justify-between pt-[24px]'>
						<Button
							type='button'
							color='black'
							size='small'
							width='custom'
							className='!bg-transparent !text-fg-default '
							onClick={hideEditForm}
						>
							{t("drawer.button.abort")}
						</Button>
						<Button
							type='submit'
							color='black'
							size='small'
							width='custom'
							disabled={submitButtonDisabled}
						>
							{t("drawer.button.save")}
						</Button>
					</div>
				</form>
			)}
			{!editForm && (
				<div>
					<TextInfoRow
						label={t("drawer.location.name.label")}
						required
						value={locationTitle}
					/>
					<TextInfoRow
						label={t("drawer.location.address.label")}
						required
						value={address}
					/>
					<TextInfoRow
						label={t("drawer.location.description.label")}
						value={locationDescription}
						className='items-start'
						required
					/>
					<TextInfoRow
						label={t("radius")}
						value={radius}
						className='items-start'
						required
					/>
					<div className='flex justify-end pt-[24px]'>
						<Button
							type='button'
							color='black'
							size='small'
							width='custom'
							onClick={showEditForm}
						>
							{t("drawer.button.edit")}
						</Button>
					</div>
				</div>
			)}
		</Slider>
	);
};

export default DrawerLocation;
