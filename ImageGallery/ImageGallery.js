import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getElementSizes } from "utilities";

import { clearImageGallery, removeImage } from "slices";

import DefaultImageIcon from "icons/defaultImg.svg";
import PlusIcon from "icons/plus.svg";
import DeleteIcon from "icons/trash2.svg";

import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import Gallery, { ControlButton, GalleryItem, Image } from "./ImageGallery.style";

const ImageGallery = ({ mode }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [imageToDeleteId, setImageToDelete] = useState("");
	const [activeGalleryItemData, setActiveGalleryItemData] = useState(null);

	const images = useSelector(state => state.imageGallery.images);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(clearImageGallery());
		};
	}, []);

	const onDeleteButton = id => () => {
		setShowDeleteModal(true);
		setImageToDelete(id);
	};

	const onImageDelete = () => {
		setShowDeleteModal(false);
		dispatch(removeImage(imageToDeleteId));
	};

	const onAddButton = index => e => {
		setActiveGalleryItemData({
			order: index,
			...getElementSizes(e.currentTarget)
		});
	};

	const onAddModalClose = () => {
		setActiveGalleryItemData(null);
	};

	const onDeleteModalClose = () => {
		setShowDeleteModal(false);
		setImageToDelete("");
	};

	return (
		<Gallery>
			{images.map(({ image, alt, id }, index) => {
				if (image) {
					return (
						<GalleryItem key={id}>
							<Image src={image} alt={alt} fill />
							{mode !== "view" && (
								<ControlButton onClick={onDeleteButton(id)}>
									<DeleteIcon />
								</ControlButton>
							)}
						</GalleryItem>
					);
				}

				return (
					<GalleryItem key={index} onClick={onAddButton(index)}>
						<DefaultImageIcon />
						{mode !== "view" && (
							<ControlButton>
								<PlusIcon />
							</ControlButton>
						)}
					</GalleryItem>
				);
			})}
			{showDeleteModal && (
				<DeleteModal onClose={onDeleteModalClose} onImageDelete={onImageDelete} />
			)}
			{activeGalleryItemData !== null && (
				<AddModal onClose={onAddModalClose} activeGalleryItemData={activeGalleryItemData} />
			)}
		</Gallery>
	);
};

export default ImageGallery;
