import { createSelector } from "@reduxjs/toolkit";

const getService = state => state.service;

const getServiceData = createSelector(getService, service => {
	const { radius, description, shortTitle, companyDescription, title, companyId, price } =
		service || {};
	return {
		radius,
		description,
		shortTitle,
		companyDescription,
		title,
		companyId,
		price
	};
});

export default getServiceData;
