import { createSelector } from "@reduxjs/toolkit";

const getCompanyId = createSelector(
	state => state.company,
	company => {
		return company.companyInfo?.id;
	}
);

export default getCompanyId;
