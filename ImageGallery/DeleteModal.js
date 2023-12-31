import { useTranslation } from "next-i18next";

import DeleteImageIcon from "icons/deleteImage.svg";

import Modal from "components/Modal";

import {
	DeleteButton,
	DeleteModalContentHolder,
	DeleteModalText,
	IconHolder
} from "./ImageGallery.style";

const DeleteModal = ({ onClose, onImageDelete }) => {
	const { t } = useTranslation();

	return (
		<Modal onClose={onClose}>
			<DeleteModalContentHolder>
				<IconHolder>
					<DeleteImageIcon />
				</IconHolder>
				<DeleteModalText>{t("service.imageGallery.deleteModal")}</DeleteModalText>
				<DeleteButton onClick={onImageDelete}>{t("deleteButton.text")}</DeleteButton>
			</DeleteModalContentHolder>
		</Modal>
	);
};

export default DeleteModal;
