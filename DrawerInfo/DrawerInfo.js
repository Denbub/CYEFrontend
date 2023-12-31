import clsx from "clsx";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { getCompany } from "selectors";
import { saveCompanyImage, updateCompany } from "slices";

import Button from "elements/v2/Button";
import ImageRow from "elements/v2/Drawer/ImageRow";
import Input from "elements/v2/Drawer/Input";
import InputRow from "elements/v2/Drawer/InputRow";
import Slider from "elements/v2/Drawer/Slider";
import TextCell from "elements/v2/Drawer/TextCell";
import TextInfoRow from "elements/v2/Drawer/TextInfoRow";
import Error from "elements/v2/Error";
import Label from "elements/v2/Label";
import Textarea from "elements/v2/Textarea";

const DrawerInfo = ({ serviceProfile }) => {
	const {
		shortTitle: title,
		companyDescription: description,
		video_youtube: videoYoutube,
		video_vimeo: videoVimeo,
		logo,
		loading
	} = useSelector(getCompany);
	const { t } = useTranslation();
	const [editForm, setEditForm] = useState(false);

	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			title,
			description,
			videoYoutube,
			videoVimeo
		},
		enableReinitialize: true,
		validateOnMount: true,
		validateOnChange: true,
		validationSchema: Yup.object({
			title: Yup.string()
				.max(40, "Must be 40 characters or less")
				.required(t("errors.required.text")),
			description: Yup.string()
				.max(180, "Must be 180 characters or less")
				.required(t("errors.required.text")),
			videoYoutube: Yup.string()
				.url(t("errors.required.link"))
				.max(180, "Must be 180 characters or less"),
			videoVimeo: Yup.string()
				.url(t("errors.required.link"))
				.max(180, "Must be 180 characters or less")
		}),
		onSubmit: ({ title, description, videoYoutube, videoVimeo }) => {
			const payload = {
				short_title: title,
				short_description: description,
				video_youtube: videoYoutube,
				video_vimeo: videoVimeo
			};
			dispatch(updateCompany(payload));
			setEditForm(false);
		}
	});

	const showEditForm = () => {
		setEditForm(true);
	};
	const hideEditForm = () => {
		setEditForm(false);
	};

	useEffect(() => {
		setSubmitButtonDisabled(loading || Object.keys(formik.errors).length > 0);
	}, [
		loading,
		formik.errors.title,
		formik.errors.description,
		formik.errors.videoVimeo,
		formik.errors.videoYoutube
	]);

	return (
		<>
			<Slider title={t("drawer.company.title")}>
				<ImageRow image={logo} dispatchSave={saveCompanyImage} fieldName='logo' />
				{editForm && (
					<form onSubmit={formik.handleSubmit}>
						<InputRow>
							<Label
								id='title'
								className='!typographySmallRegular text-fg-default'
								required
								label={t("drawer.company.form.name")}
							/>
							<Input
								id='title'
								required
								className={formik.errors.title && "!border-accent-default"}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.title}
								placeholder={t("drawer.company.form.namePlaceholder")}
								type='text'
								name='title'
							/>
							<Error error={formik.errors.title} style='top' />
						</InputRow>
						<InputRow>
							<Label
								id='videoYoutube'
								className='!typographySmallRegular text-fg-default'
								label={t("drawer.company.form.videoYoutube")}
							/>
							<Input
								id='videoYoutube'
								className={formik.errors.videoYoutube && "!border-accent-default"}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.videoYoutube}
								placeholder={t("drawer.company.form.linkPlaceholder")}
								type='link'
								name='videoYoutube'
							/>
							<Error error={formik.errors.videoYoutube} style='top' />
						</InputRow>
						<InputRow>
							<Label
								id='videoVimeo'
								className='!typographySmallRegular text-fg-default'
								label={t("drawer.company.form.videoVimeo")}
							/>
							<Input
								id='videoVimeo'
								className={formik.errors.videoVimeo && "!border-accent-default"}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.videoVimeo}
								placeholder={t("drawer.company.form.linkPlaceholder")}
								type='link'
								name='videoVimeo'
							/>
							<Error error={formik.errors.videoVimeo} style='top' />
						</InputRow>
						<InputRow className='items-start'>
							<Label
								id='description'
								className='!typographySmallRegular text-fg-default'
								label={t("drawer.company.form.description")}
								required
							/>
							<Textarea
								id='description'
								name='description'
								type='description'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								defaultValue={formik.values.description}
								placeholder={t("drawer.company.form.descriptionPlaceholder")}
								required
								className={clsx(
									formik.errors.description && "!border-accent-default",
									" !typographyInputNormalRegular"
								)}
							/>
							<Error error={formik.errors.description} style='top' />
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
						<TextInfoRow label={t("drawer.company.form.name")} required value={title} />
						<InputRow>
							<Label
								label={t("drawer.company.form.videoYoutube")}
								className='!typographySmallRegular'
							/>
							{videoYoutube && (
								<Link
									href={videoYoutube}
									target={"_blank"}
									className='min-w-[316px]'
								>
									<TextCell>{videoYoutube}</TextCell>
								</Link>
							)}
						</InputRow>
						<InputRow>
							<Label
								label={t("drawer.company.form.videoVimeo")}
								className='!typographySmallRegular'
							/>
							{videoVimeo && (
								<Link href={videoVimeo} target={"_blank"} className='min-w-[316px]'>
									<TextCell>{videoVimeo}</TextCell>
								</Link>
							)}
						</InputRow>
						<TextInfoRow
							label={t("drawer.company.form.description")}
							value={description}
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
		</>
	);
};

export default DrawerInfo;
