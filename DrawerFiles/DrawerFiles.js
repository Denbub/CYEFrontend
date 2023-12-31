import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCompanyId } from "selectors";
import { clearDocuments, fetchDocuments, saveDocuments } from "slices";

import Button from "elements/v2/Button";
import InputRow from "elements/v2/Drawer/InputRow";
import Slider from "elements/v2/Drawer/Slider";
import Label from "elements/v2/Label";

import RightLabel from "./RightLabel";
import TextCell from "./TextCellWithDelete";

const DrawerFiles = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { documents, loading } = useSelector(state => state.documents);
	const [editForm, setEditForm] = useState(false);
	const [uploadFiles, setUploadFiles] = useState({});
	const companyId = useSelector(getCompanyId);

	const handleUploadFile = (e, id) => {
		setUploadFiles(uploadFiles => ({
			...uploadFiles,
			[e.target.id]: { file: e.target.files[0], id }
		}));
	};

	const handleSaveFiles = () => {
		dispatch(saveDocuments(uploadFiles));
		setUploadFiles({});
		setEditForm(false);
	};

	const showEditForm = () => {
		setEditForm(true);
	};
	const hideEditForm = () => {
		setEditForm(false);
	};

	useEffect(() => {
		if (companyId) {
			dispatch(fetchDocuments(companyId));
		}

		return () => {
			dispatch(clearDocuments());
		};
	}, [companyId]);

	return (
		<Slider title={t("drawer.documents.title")}>
			{!editForm && !loading && (
				<div>
					<InputRow>
						<Label
							label={t("drawer.documents.dataProtect.label")}
							className='!typographySmallRegular'
						/>
						<TextCell file={documents?.dataProtect} />
					</InputRow>
					<InputRow>
						<Label
							label={t("drawer.documents.rightToObject.label")}
							className='!typographySmallRegular'
						/>
						<TextCell file={documents?.rightToObject} />
					</InputRow>
					<InputRow>
						<Label
							label={t("drawer.documents.imprint.label")}
							className='!typographySmallRegular'
						/>
						<TextCell file={documents?.imprint} />
					</InputRow>
					<div className='flex justify-end pt-lg'>
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
			{editForm && !loading && (
				<div>
					<InputRow>
						<Label
							id='dataProtect'
							label={t("drawer.documents.dataProtect.label")}
							className='!typographySmallRegular'
						/>
						<RightLabel
							uploadedFile={documents?.dataProtect}
							id='dataProtect'
							onChangeAction={handleUploadFile}
						>
							{t("drawer.documents.dataProtect.placeholder")}
						</RightLabel>
					</InputRow>
					<InputRow>
						<Label
							id='rightToObject'
							label={t("drawer.documents.rightToObject.label")}
							className='!typographySmallRegular'
						/>
						<RightLabel
							uploadedFile={documents?.rightToObject}
							id='rightToObject'
							onChangeAction={handleUploadFile}
						>
							{t("drawer.documents.rightToObject.placeholder")}
						</RightLabel>
					</InputRow>
					<InputRow>
						<Label
							label={t("drawer.documents.imprint.label")}
							id='imprint'
							className='!typographySmallRegular'
						/>
						<RightLabel
							uploadedFile={documents?.imprint}
							id='imprint'
							onChangeAction={handleUploadFile}
						>
							{t("drawer.documents.imprint.placeholder")}
						</RightLabel>
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
							type='button'
							color='black'
							size='small'
							width='custom'
							onClick={handleSaveFiles}
						>
							{t("saveButton.text")}
						</Button>
					</div>
				</div>
			)}
		</Slider>
	);
};

export default DrawerFiles;
