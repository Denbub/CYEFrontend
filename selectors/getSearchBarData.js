import { createSelector } from "@reduxjs/toolkit";

const createServicesList = (category, services) => {
	category.service_templates.map(service => {
		services.push({
			label: service.name,
			value: service.id,
			isDisabled: false
		});
	});
};

const getCategories = state => {
	return state.serviceAdd.categories.map(category => {
		return {
			label: category.name,
			value: category.id,
			isDisabled: false
		};
	});
};

const getServices = state => {
	const services = [];

	const { category: selectedCategory } = state.search.params;

	if (selectedCategory) {
		const category = state.serviceAdd.categories.find(
			category => category.id === selectedCategory
		);

		category && createServicesList(category, services);
	} else {
		state.serviceAdd.categories.map(category => {
			createServicesList(category, services);
		});
	}

	return services;
};

const getSearchParams = state => {
	const params = state.search.params;
	const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
		if (value !== null) {
			acc[key] = value;
		}
		return acc;
	}, {});
	return filteredParams;
};

const getSearchBarData = createSelector(
	getSearchParams,
	getCategories,
	getServices,
	(searchParams, categories, services) => ({
		categories,
		services,
		searchParams
	})
);

export default getSearchBarData;
