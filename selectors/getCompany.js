import { createSelector } from "@reduxjs/toolkit";

export const getCompany = createSelector(
	state => ({
		...state.company.companyInfo,
		loading: state.company.loading,
		url: state.company.url
	}),
	company => company
);

export default getCompany;
