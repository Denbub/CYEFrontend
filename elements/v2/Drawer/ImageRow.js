import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDispatch } from "react-redux";

import { editImage, onFileLoad } from "utilities";

import Modal from "components/v2/Modal";
import Button from "elements/v2/Button";
import Label from "elements/v2/Label";

import AvatarImage from "icons/avatar.svg";

const ImageRow = ({ id = null, modalTitle, image, fieldName = "image", dispatchSave }) => {
	const [modalStatus, setModalStats] = useState(false);
	const [imageSrc, setImageSrc] = useState(null);
	const editorRef = useRef();
	const dispatch = useDispatch();
	const inputId = useId();
	const inputRef = useRef();
	const { t } = useTranslation();
	const img = imageSrc || image || "/images/defaultImage.svg";

	const setModalOpen = () => {
		setModalStats(true);
		setImageSrc(null);
	};

	const setModalClose = () => {
		setModalStats(false);
	};

	const onImageSuccess = file => {
		setImageSrc(URL.createObjectURL(file));
	};

	const onDelete = () => {
		dispatch(dispatchSave({ id, file: null, fieldName }));
		setModalClose();
	};

	const onSave = uploadImage => {
		dispatch(dispatchSave({ id, file: uploadImage, fieldName }));
		setModalClose();
	};

	const onCancel = () => {
		setImageSrc(null);
	};

	return (
		<div className='relative flex justify-between pt-[24px]'>
			<div className='relative flex w-full items-center'>
				<Image
					src={img}
					width='100'
					height='100'
					alt=''
					className='h-[100px] w-[100px] rounded-[9999px]'
				/>
				<div className='absolute left-[70px] bottom-[5px] rounded-[9999px] bg-white p-sm'>
					<AvatarImage className='h-md w-md' />
				</div>

				<Button
					onClick={setModalOpen}
					type='button'
					size='small'
					color='grey'
					width='custom'
					className='typographyButtonNormalBold ml-[18px] !h-[32px] min-w-fit !py-[5px] !px-[34px]'
				>
					{t("drawer.company.avatar.add")}
				</Button>
			</div>
			<Modal
				opened={modalStatus}
				showCloseButton={true}
				closeOnDocumentClick={true}
				onCloseAction={setModalClose}
			>
				<h5 className='typographyHeadline-5Bold pb-sm'>
					{modalTitle || t("service.header.modal.imageTitle")}
				</h5>
				<input
					id={inputId}
					ref={inputRef}
					type='file'
					accept='image/*'
					onChange={onFileLoad({
						maxSizeMB: 5,
						onSuccess: onImageSuccess
					})}
					className='hidden'
				/>

				<AvatarEditor
					ref={editorRef}
					image={img}
					width={226}
					height={226}
					borderRadius={226}
					color={[0, 0, 0, 0.6]}
				/>
				<div className='mt-md flex justify-between'>
					{!image && !imageSrc && (
						<Label
							label={t("drawer.modalImage.addPhoto")}
							id={inputId}
							className={clsx(
								"!typographyButtonNormalBold  flex cursor-pointer items-center justify-center rounded-full bg-grey-950 text-fg-on-accent duration-200",
								"h-[32px] min-w-fit gap-[12px] py-[5px] px-[34px] xl:py-[14px]"
							)}
						/>
					)}
					{image && !imageSrc && (
						<>
							<Label
								label={t("drawer.modalImage.changePhoto")}
								id={inputId}
								className={clsx(
									"!typographyButtonNormalBold  flex cursor-pointer items-center justify-center rounded-full bg-grey-950 text-fg-on-accent duration-200",
									"h-[32px] min-w-fit gap-[12px] py-[5px] px-[34px] xl:py-[14px]"
								)}
							/>
							<Button
								type='button'
								color='default'
								size='small'
								width='custom'
								className='typographyButtonNormalBold !h-[32px] !min-w-[89px]'
								onClick={onDelete}
							>
								{t("drawer.modalImage.deletePhoto")}
							</Button>
						</>
					)}
					{imageSrc && (
						<>
							<Button
								type='button'
								color='grey'
								size='small'
								width='custom'
								className='typographyButtonNormalBold !h-[32px] !min-w-[89px]'
								onClick={editImage(onSave, editorRef)}
							>
								{t("drawer.modalImage.savePhoto")}
							</Button>
							<Button
								type='button'
								color='default'
								width='custom'
								className='!typographyButtonNormalBold mr-sm !h-[32px] !min-w-[89px]'
								size='small'
								onClick={onCancel}
							>
								{t("drawer.button.abort")}
							</Button>
						</>
					)}
				</div>
			</Modal>
		</div>
	);
};

export default ImageRow;
