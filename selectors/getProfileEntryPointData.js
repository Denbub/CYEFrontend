import { createSelector } from "@reduxjs/toolkit";

const getMainService = state => state.service.mainService;
const getCompanyInfo = state => state.company.companyInfo;

const getProfileEntryPointData = createSelector(
	getMainService,
	getCompanyInfo,

	(mainService, companyInfo) => {
		if (Object.keys(mainService).length) {
			return mainService;
		} else {
			const company = companyInfo || {};

			return {
				imageUrl: company.imageUrl,
				name: company.shortTitle,
				description: company.CompanyDescription,
				id: company.id
			};
		}
	}
);

export default getProfileEntryPointData;
