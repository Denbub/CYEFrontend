import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import { serviceTypes } from "constant";
import { mainApi } from "services/axios";

import { getCompanyId } from "selectors";

export const fetchCategories = createAsyncThunk(
	"serviceAdd/fetchCategories",
	async (payload, thunkAPI) => {
		try {
			const response = await mainApi.get("/services/categories/", {
				...payload
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const fetchCompanyServices = createAsyncThunk(
	"serviceAdd/fetchCompanyServices",
	async (_, thunkAPI) => {
		const companyId = getCompanyId(thunkAPI.getState());
		try {
			const response = await mainApi.get(`/services/?company=${companyId}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const addService = createAsyncThunk("serviceAdd/addService", async (payload, thunkAPI) => {
	try {
		const response = await mainApi.post("/services/", payload);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "Technical problem" });
	}
});
const initialState = {
	categories: [],
	servicesList: [],
	loading: false,
	mainServiceId: null,
	subService: null
};
export const serviceAddSlice = createSlice({
	name: "serviceAdd",
	initialState,
	reducers: {
		clearServiceAdd() {
			return initialState;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchCategories.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
			if (payload.length) {
				state.categories = payload;
				state.templates = {};
				state.servicesList = payload.reduce((acc, category) => {
					acc[category.id] = category.service_templates.map(service => {
						state.templates[service.id] = service;
						return {
							label: service.name,
							value: service.id,
							isDisabled: false
						};
					});

					return acc;
				}, {});
			}

			state.loading = false;
		});
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.serviceId = null;
			state.error = action.error.message;
			state.loading = false;
		});
		builder.addCase(fetchCompanyServices.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchCompanyServices.fulfilled, (state, { payload }) => {
			if (payload.length) {
				state.mainServiceId = payload.some(service => {
					if (service.type === serviceTypes.MAIN) {
						return service.id;
					}
				});
				state.subServices = payload.some(
					service => service.type === serviceTypes.SUB_SERVICE
				);
			}

			state.loading = false;
		});
		builder.addCase(fetchCompanyServices.rejected, (state, action) => {
			state.serviceId = null;
			state.error = action.error.message;
			state.loading = false;
		});
		builder.addCase(addService.pending, state => {
			state.loading = true;
		});
		builder.addCase(addService.fulfilled, (state, { payload }) => {
			if (payload) {
				state.serviceId = payload.id;
			}

			state.loading = false;
		});
		builder.addCase(addService.rejected, (state, action) => {
			state.companyInfo = null;
			state.error = action.error.message;
		});
	}
});

export const getCategories = createSelector(
	state => ({
		categories: state.serviceAdd.categories,
		servicesList: state.serviceAdd.servicesList,
		templates: state.serviceAdd.templates,
		loading: state.serviceAdd.loading
	}),
	state => state
);

export const getServiceInfo = createSelector(
	state => state.serviceAdd,
	serviceAdd => ({
		serviceId: serviceAdd.serviceId,
		mainServiceId: serviceAdd.mainServiceId,
		subService: serviceAdd.subService
	})
);

export const { clearServiceAdd } = serviceAddSlice.actions;

export const serviceAddReducer = serviceAddSlice.reducer;
