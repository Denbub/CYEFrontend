import { createSelector } from "@reduxjs/toolkit";

const getServices = state => state.search.services;

const getServicesLocations = createSelector(getServices, services => {
	return services.map(service => service.location);
});

export default getServicesLocations;
