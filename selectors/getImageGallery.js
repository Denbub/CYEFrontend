import { createSelector } from "@reduxjs/toolkit";

export const getImageGallery = createSelector(
	state => state.imageGallery.images,
	imageGallery => {
		const galleryNotEmpty = imageGallery.some(image => image.id);

		return {
			images: imageGallery,
			galleryNotEmpty
		};
	}
);

export default getImageGallery;
