import { useTranslation } from "next-i18next";
import { useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { editImage, onFileLoad } from "utilities";

import ImagePreview from "components/ImagePreview";
import Modal from "components/Modal";

import PhotoIcon from "icons/photo.svg";
import DeleteIcon from "icons/trash.svg";

import Wrapper, {
	ButtonDescription,
	ButtonHolder,
	ButtonsHolder,
	ChangeImageLabel,
	CustomBgImage,
	CustomBgImageHolder,
	DeleteButton,
	FileInput,
	ImageHolder,
	SaveButton,
	Title
} from "./EditModal.style";

const EditModal = ({ onModalClose, onDeleteButton, companyBg, updateImage }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [imageSrc, setImageSrc] = useState("");
	const inputId = useId();
	const editorRef = useRef();

	const showDeleteButton = !!companyBg;

	const onImageSuccess = file => {
		setImageSrc(URL.createObjectURL(file));
	};

	const onImageEditingSuccess = image => {
		dispatch(updateImage(image));
		onModalClose();
	};

	return (
		<Modal onClose={onModalClose}>
			<Wrapper>
				<Title>{t("service.header.modal.bgImageTitle")}</Title>
				<input
					id={inputId}
					type='file'
					accept='image/*'
					onChange={onFileLoad({
						maxSizeMB: 5,
						onSuccess: onImageSuccess
					})}
					style={{
						display: "none"
					}}
				/>
				{imageSrc ? (
					<>
						<ImagePreview
							imageSrc={imageSrc}
							width={1920}
							height={269}
							editorRef={editorRef}
							style={{
								transform: "scale(0.4)"
							}}
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
					<>
						<ImageHolder>
							<CustomBgImageHolder>
								<CustomBgImage
									src={companyBg || "/images/serviceDefaultBg.png"}
									alt='background image'
									fill
								/>
							</CustomBgImageHolder>
						</ImageHolder>
						<ButtonsHolder>
							<ButtonHolder>
								<FileInput>
									<PhotoIcon />
									<input
										type='file'
										accept='image/*'
										onChange={onFileLoad({
											maxSizeMB: 5,
											onSuccess: onImageSuccess
										})}
									/>
								</FileInput>
								<ButtonDescription>
									{t("service.header.modal.fileInput")}
								</ButtonDescription>
							</ButtonHolder>
							{showDeleteButton && (
								<ButtonHolder>
									<DeleteButton onClick={onDeleteButton}>
										<DeleteIcon />
									</DeleteButton>
									<ButtonDescription>{t("deleteButton.text")}</ButtonDescription>
								</ButtonHolder>
							)}
						</ButtonsHolder>
					</>
				)}
			</Wrapper>
		</Modal>
	);
};

export default EditModal;
