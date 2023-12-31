import clsx from "clsx";
import { useTranslation } from "next-i18next";

import DeleteImageIcon from "icons/deleteImage.svg";

import Modal from "components/v2/Modal";

import Button from "elements/v2/Button";

const DeleteModal = ({ onClose, onImageDelete }) => {
	const { t } = useTranslation();

	return (
		<Modal onCloseAction={onClose} opened showCloseButton={true}>
			<div
				className={clsx(
					"flex flex-col items-center justify-center",
					"w-[350px] py-[35px] xl:w-[475px] xl:px-[92px] xl:py-[30px] "
				)}
			>
				<div className='mb-[20px] h-[50px] w-[50px]'>
					<DeleteImageIcon />
				</div>
				<div className='typographyBodyBold mb-[30px] text-center md:typographySmallRegular'>
					{t("service.imageGallery.deleteModal")}
				</div>
				<div className=' w-[101px]'>
					<Button onClick={onImageDelete} className='typographyButtonLargeBold  px-lg'>
						{t("deleteButton.text")}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteModal;
