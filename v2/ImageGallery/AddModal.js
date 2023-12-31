import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { editImage, onFileLoad } from "utilities";

import { addImage } from "slices";

import Button from "elements/v2/Button";

import ImagePreview from "components/ImagePreview";
import Modal from "components/v2/Modal";
import PhotoIcon from "icons/photo.svg";

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
		<Modal onCloseAction={onClose} opened showCloseButton={true}>
			<div className='flex w-[300px] flex-col items-center md:w-[580px] lg:w-[800px]'>
				<h5 className='typographyHeadline-5Bold mb-l w-full text-fg-default xl:typographyHeadline-2Bold xl:mb-xl'>
					{t("service.imageGallery.addModalTitle")}
				</h5>
				{imageSrc ? (
					<>
						<ImagePreview
							imageSrc={imageSrc}
							width={width}
							height={height}
							borderRadius={borderRadius}
							editorRef={editorRef}
						/>
						<div className='flex h-[42px] w-[240px] justify-between gap-[13px]'>
							<label
								className={clsx(
									"flex items-center justify-center rounded-[150px] px-lg py-[14px]",
									"cursor-pointer rounded-[150px]  bg-fg-default",
									"h-[42px] w-[130px] px-lg py-[14px] ",
									"typographyButtonLargeBold whitespace-nowrap text-white"
								)}
								htmlFor={inputId}
							>
								{t("service.imageGallery.changeImage")}
							</label>
							<Button
								onClick={editImage(onImageEditingSuccess, editorRef)}
								className=' typographyButtonLargeBold w-[130px] px-lg'
								size='regular'
							>
								{t("saveButton.text")}
							</Button>
						</div>
					</>
				) : (
					<div>
						<label
							className={clsx(
								"mb-l flex items-center justify-center",
								"cursor-pointer rounded-[50%] bg-fg-default/5",
								"h-[226px] w-[226px] "
							)}
							htmlFor={inputId}
						>
							<PhotoIcon width={78} height={64} />
						</label>
						<label
							className={clsx(
								"typographyInputNormalRegular block text-center",
								"cursor-pointer rounded-[50%]",
								"w-full  "
							)}
							htmlFor={inputId}
						>
							{t("service.imageGallery.addPhoto")}
						</label>
					</div>
				)}

				<input
					className='hidden'
					type='file'
					id={inputId}
					accept='image/*'
					onChange={onFileLoad({ maxSizeMB: 5, onSuccess: onImageSuccess })}
				/>
			</div>
		</Modal>
	);
};

export default AddModal;
