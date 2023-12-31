import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import usePageWidth from "hooks/usePageWidth";
import { getImageGallery } from "selectors";
import { clearImageGallery, removeImage } from "slices";

import { screenSizes } from "constant";
import { getElementSizes } from "utilities";

const useImageGallery = profilePage => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [imageToDeleteId, setImageToDelete] = useState("");
	const [activeGalleryItemData, setActiveGalleryItemData] = useState(null);
	const { images, galleryNotEmpty } = useSelector(getImageGallery);
	const dispatch = useDispatch();

	const [swiperVisibility, setSwiperVisibility] = useState(false);

	const pageWidth = usePageWidth();

	useEffect(() => {
		if (pageWidth < screenSizes.xl && images.length > 1) {
			setSwiperVisibility(true);
		} else {
			setSwiperVisibility(false);
		}
	}, [images.length, pageWidth]);

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

	return {
		showDeleteModal,
		activeGalleryItemData,
		images,
		galleryNotEmpty,
		onAddModalClose,
		onDeleteModalClose,
		onAddButton,
		onImageDelete,
		onDeleteButton,
		swiperVisibility
	};
};

export default useImageGallery;
