import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import Modal from "components/v2/Modal";

import Button from "elements/v2/Button";
import Checkbox from "elements/v2/Checkbox";
import Error from "elements/v2/Error";

const reportReasons = [
	{ id: 1, text: "Rechtswidriger Inhalt nach KoPI-G" },
	{ id: 2, text: "Spam" },
	{ id: 3, text: "Nacktheit oder sexuelle Handlungen" },
	{ id: 4, text: "Hassrede oder -symbole" },
	{ id: 5, text: "Gewalt oder gefährliche Organisationen" }
];

const ReportModal = ({ opened, modalCloseHandler, deleteAccountHandler }) => {
	const { t } = useTranslation();
	const [sent, setSent] = useState(false);

	const formik = useFormik({
		initialValues: {
			reportReason: []
		},

		onSubmit: async (values, { setFieldError }) => {
			if (!values.reportReason.length) {
				setFieldError("reportReason", t("report.modal.error"));
			} else {
				setSent(true);
			}
		}
	});

	const { errors, touched, values, setFieldError, handleSubmit } = formik;

	const updateReasonValues = (name, checked) => {
		const valueIndex = values.reportReason.indexOf(name);
		let reasons = values.reportReason;
		if (valueIndex > -1 && !checked) {
			reasons.splice(valueIndex, 1);
		} else {
			reasons.push(name);
		}

		formik.setFieldValue("reportReason", reasons);
	};
	return (
		<Modal
			opened={opened}
			onCloseAction={modalCloseHandler}
			closeOnDocumentClick={true}
			showCloseButton={false}
			className='w-[350px]'
		>
			{!sent ? (
				<>
					<h4 className='typographyHeadline-5Bold'>{t("report.modal.title")}</h4>
					<div className='typographySmallRegular mt-sm mb-[27px] text-fg-subtle'>
						{t("report.modal.description")}
					</div>
					<form onSubmit={handleSubmit}>
						{reportReasons.map(reason => (
							<Checkbox
								key={reason.id}
								className='typographyCaptionRegular mb-[12px]'
								label={reason.text}
								name={reason.id}
								setFieldValue={updateReasonValues}
							/>
						))}
						{errors.reportReason && touched.reportReason && (
							<Error error={errors.reportReason} />
						)}
						<div className='mt-[30px] flex justify-end'>
							<Button
								type='button'
								width='custom'
								size='small'
								className='typographyButtonNormalBold h-l !min-w-fit bg-transparent !text-fg-default'
								onClick={modalCloseHandler}
							>
								{t("cancelButton.text")}
							</Button>
							<Button
								type='submit'
								width='custom'
								size='small'
								className='typographyButtonNormalBold h-l !min-w-fit'
							>
								{t("report.modal.button.report")}
							</Button>
						</div>
					</form>
				</>
			) : (
				<div className='flex justify-between'>
					<h5 className='typographyHeadline-5Bold'>{t("report.modal.finalText")}</h5>
					<Button
						type='button'
						width='custom'
						size='small'
						className='typographyButtonNormalBold h-l !min-w-fit'
						onClick={modalCloseHandler}
					>
						{t("report.modal.button.close")}
					</Button>
				</div>
			)}
		</Modal>
	);
};

export default ReportModal;
