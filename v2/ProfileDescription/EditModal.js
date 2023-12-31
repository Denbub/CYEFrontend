import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";

import Modal from "components/Modal";
import Error from "elements/Error";
import Label from "elements/Label";

import { Button, Form, Input, TextArea } from "./EditModal.style";

const EditModal = ({ title, description, onClose, onSubmit }) => {
	//TODO: remove EditModal and EditModal.style files after drawer part with description will be ready
	const { t } = useTranslation();

	const formik = useFormik({
		initialValues: {
			title,
			description
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.max(60, "Must be 60 characters or less")
				.required(t("errors.required.text")),
			description: Yup.string()
				.max(5000, "Must be 5000 characters or less")
				.required(t("errors.required.text"))
		}),
		onSubmit
	});

	return (
		<Modal onClose={onClose}>
			<Form onSubmit={formik.handleSubmit}>
				<Label htmlFor='title'>Title</Label>
				<Input
					id='title'
					name='title'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.title}
				/>
				{formik.touched.title && formik.errors.title ? (
					<Error>{formik.errors.title}</Error>
				) : null}

				<Label htmlFor='description'>Description</Label>
				<TextArea
					id='description'
					name='description'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
				/>
				{formik.touched.description && formik.errors.description ? (
					<Error>{formik.errors.description}</Error>
				) : null}

				<Button type='submit' width='101'>
					{t("saveButton.text")}
				</Button>
			</Form>
		</Modal>
	);
};

export default EditModal;
