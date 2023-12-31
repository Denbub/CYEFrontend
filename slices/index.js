import {
	checkStatus,
	clearCompany,
	companyReducer,
	createCompany,
	deleteCompany,
	fetchCompany,
	fetchCompanyEntryPoint,
	fetchCompanyUserViewData,
	getAccountLink,
	saveCompanyImage,
	updateCompany,
	updateCompanyBgImage,
	updateCompanyLogo
} from "./companySlice";

import {
	addService,
	clearServiceAdd,
	fetchCategories,
	fetchCompanyServices,
	getCategories,
	getServiceInfo,
	serviceAddReducer
} from "./serviceAddSlice";

import { dropdownReducer, setActiveDropdownId } from "./dropdownsSlice";
import { addImage, clearImageGallery, imageGalleryReducer, removeImage } from "./imageGallerySlice";
import {
	clearService,
	deleteService,
	fetchMainService,
	fetchService,
	fetchServices,
	fetchSubservices,
	serviceReducer,
	updateService,
	updateSubservice
} from "./serviceSlice";
import {
	addSocialMediaLinks,
	deleteSocialMediaLinks,
	fetchSocialMediaLinks,
	fetchSocialMediaLinksConfig,
	socialMediaLinksReducer,
	updateSocialMediaLinks
} from "./socialMediaLinks";
import {
	addTeamMember,
	addTeamMemberJson,
	deleteTeamMember,
	fetchTeam,
	saveTeamImage,
	teamReducer,
	updateTeamMember,
	updateTeamMemberJson
} from "./teamSlice";
import {
	fetchUser,
	fetchUserSession,
	getLoggedIn,
	logout,
	selectUser,
	setToken,
	updateSession,
	updateUser,
	userReducer
} from "./userSlice";

import {
	addEventType,
	clearEventTypes,
	deleteEventType,
	eventTypesReducer,
	fetchEventTypes,
	getEventTypes
} from "./eventTypesSlice";

import {
	clearSearch,
	searchReducer,
	searchServices,
	setInitialParams,
	setSearchParams
} from "./searchSlice";

import { closeDrawer, drawerReducer, openDrawer } from "./drawerSlice";

import {
	clearDocuments,
	deleteDocument,
	documentsReducer,
	fetchDocuments,
	saveDocuments
} from "./documentsSlice";

export {
	addEventType,
	addImage,
	addService,
	addSocialMediaLinks,
	addTeamMember,
	addTeamMemberJson,
	checkStatus,
	clearCompany,
	clearDocuments,
	clearEventTypes,
	clearImageGallery,
	clearSearch,
	clearService,
	clearServiceAdd,
	closeDrawer,
	companyReducer,
	createCompany,
	deleteCompany,
	deleteDocument,
	deleteEventType,
	deleteService,
	deleteSocialMediaLinks,
	deleteTeamMember,
	documentsReducer,
	drawerReducer,
	dropdownReducer,
	eventTypesReducer,
	fetchCategories,
	fetchCompany,
	fetchCompanyEntryPoint,
	fetchCompanyServices,
	fetchCompanyUserViewData,
	fetchDocuments,
	fetchEventTypes,
	fetchMainService,
	fetchService,
	fetchServices,
	fetchSocialMediaLinks,
	fetchSocialMediaLinksConfig,
	fetchSubservices,
	fetchTeam,
	fetchUser,
	fetchUserSession,
	getAccountLink,
	getCategories,
	getEventTypes,
	getLoggedIn,
	getServiceInfo,
	imageGalleryReducer,
	logout,
	openDrawer,
	removeImage,
	saveCompanyImage,
	saveDocuments,
	saveTeamImage,
	searchReducer,
	searchServices,
	selectUser,
	serviceAddReducer,
	serviceReducer,
	setActiveDropdownId,
	setInitialParams,
	setSearchParams,
	setToken,
	socialMediaLinksReducer,
	teamReducer,
	updateCompany,
	updateCompanyBgImage,
	updateCompanyLogo,
	updateService,
	updateSession,
	updateSocialMediaLinks,
	updateSubservice,
	updateTeamMember,
	updateTeamMemberJson,
	updateUser,
	userReducer
};
