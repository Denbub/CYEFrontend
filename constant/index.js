export const directions = {
	horizontal: "horizontal",
	vertical: "vertical"
};

export const screenSizes = {
	MOBILE: 360,
	TABLET: 768,
	LAPTOP: 1366,
	DESKTOP: 1920,
	xl: 1280
};

export const breakpoints = {
	MOBILE: `${screenSizes.MOBILE}px`,
	TABLET: `${screenSizes.TABLET}px`,
	LAPTOP: `${screenSizes.LAPTOP}px`,
	DESKTOP: `${screenSizes.DESKTOP}px`
};

export const landList = [
	{ label: "Österreich", value: "AT", isDisabled: false },
	{ label: "Deutschland", value: "DE", isDisabled: false },
	{ label: "Schweiz", value: "CH", isDisabled: false }
];

export const serviceTypes = {
	MAIN: "main",
	SUB_SERVICE: "subservice"
};

export const attributesGroupsType = {
	checkboxes: "checkboxes",
	textInputs: "text_inputs",
	dropdown: "dropdown"
};

export const companyRegistrationStatus = {
	onboarding: "onboarding",
	active: "active",
	pending: "pending"
};
