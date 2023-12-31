import { configureStore } from "@reduxjs/toolkit";

import {
	companyReducer,
	documentsReducer,
	drawerReducer,
	dropdownReducer,
	eventTypesReducer,
	imageGalleryReducer,
	searchReducer,
	serviceAddReducer,
	serviceReducer,
	socialMediaLinksReducer,
	teamReducer,
	userReducer
} from "slices";
import { errorMiddleware } from "./errorMiddleware";

export default function configureAppStore(preloadedState) {
	const store = configureStore({
		reducer: {
			user: userReducer,
			service: serviceReducer,
			socialMediaLinks: socialMediaLinksReducer,
			imageGallery: imageGalleryReducer,
			team: teamReducer,
			dropdowns: dropdownReducer,
			company: companyReducer,
			serviceAdd: serviceAddReducer,
			eventTypes: eventTypesReducer,
			search: searchReducer,
			drawer: drawerReducer,
			documents: documentsReducer
		},
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(errorMiddleware),
		devTools: process.env.NODE_ENV !== "production"
	});

	return store;
}
