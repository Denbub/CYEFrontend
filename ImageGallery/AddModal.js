import { useTranslation } from "next-i18next";
import { useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { editImage, onFileLoad } from "utilities";

import { addImage } from "slices";

import ImagePreview from "components/ImagePreview";
import Modal from "components/Modal";
import PhotoIcon from "icons/photo.svg";

import {
	AddModalContentHolder,
	AddModalTitle,
	AddPhotoLabel,
	ButtonsHolder,
	ChangeImageLabel,
	PhotoIconHolder,
	SaveButton
} from "./ImageGallery.style";

const AddModal = ({ onClose, activeGalleryItemData }) => {
	const { t } = useTranslation();
	const inputId = useId();
	const dispatch = useDispatch();
	const editorRef = useRef();
	const [imageSrc, setImageSrc] = useState("");
	const { width, height, order, borderRadius } = activeGalleryItemData;

	const onImageSuccess = file => {
		setImageSrc(URL.createObjectURL(file));
	};

	const onImageEditingSuccess = image => {
		dispatch(addImage({ image, order }));
		onClose();
	};

	return (
		<Modal onClose={onClose}>
			<AddModalContentHolder>
				<AddModalTitle>{t("service.imageGallery.addModalTitle")}</AddModalTitle>
				{imageSrc ? (
					<>
						<ImagePreview
							imageSrc={imageSrc}
							width={width}
							height={height}
							borderRadius={borderRadius}
							editorRef={editorRef}
						/>
						<ButtonsHolder>
							<ChangeImageLabel htmlFor={inputId}>
								{t("service.imageGallery.changeImage")}
							</ChangeImageLabel>
							<SaveButton onClick={editImage(onImageEditingSuccess, editorRef)}>
								{t("saveButton.text")}
							</SaveButton>
						</ButtonsHolder>
					</>
				) : (
					<div>
						<PhotoIconHolder htmlFor={inputId}>
							<PhotoIcon width={78} height={64} />
						</PhotoIconHolder>
						<AddPhotoLabel htmlFor={inputId}>
							{t("service.imageGallery.addPhoto")}
						</AddPhotoLabel>
					</div>
				)}

				<input
					type='file'
					id={inputId}
					accept='image/*'
					onChange={onFileLoad({ maxSizeMB: 5, onSuccess: onImageSuccess })}
				/>
			</AddModalContentHolder>
		</Modal>
	);
};

export default AddModal;
