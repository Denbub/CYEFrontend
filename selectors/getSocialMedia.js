import { createSelector } from "@reduxjs/toolkit";

const getFormikValues = state =>
	state.socialMediaLinks.links.map(element => {
		return {
			id: element.id,
			url: element.url,
			name: element.name,
			socialMediaId: element.social_media
		};
	});

const getSocialMediaOptions = state => {
	const config = Object.values(state.socialMediaLinks.config);
	if (config.length) {
		return config.map(({ name, id }) => {
			return {
				label: name,
				value: id
			};
		});
	}
	return [];
};

const getSocialMedia = createSelector(
	getFormikValues,
	getSocialMediaOptions,

	(formikValues, selectOptions) => ({
		formikValues,
		selectOptions
	})
);

export default getSocialMedia;
