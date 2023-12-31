import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainApi } from "services/axios";

import { isAnyOfType } from "utilities/sliceHelpers";

import { addService } from "./serviceAddSlice";

import { logout } from "./userSlice";

export const fetchService = createAsyncThunk(
	"service/fetchService",
	async ({ serviceId, companyId }, thunkAPI) => {
		try {
			if (serviceId) {
				const response = await mainApi.get(`/services/${serviceId}`);

				return response.data;
			} else {
				const response = await mainApi.get(`/services/?company=${companyId}&type=main`);
				return response.data[0];
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const fetchServices = createAsyncThunk(
	"service/fetchServices",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.get(`/services/?company=${companyId}`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const fetchSubservices = createAsyncThunk(
	"service/fetchSubservices",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.get(`/services/?company=${companyId}&type=subservice`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const fetchMainService = createAsyncThunk(
	"service/fetchMainService",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.get(`/services/?company=${companyId}&type=main`);
			return response.data[0];
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const updateService = createAsyncThunk("service/updateService", async (data, thunkAPI) => {
	try {
		const serviceId = thunkAPI.getState().service.id;
		const response = await mainApi.patch(`/services/${serviceId}/`, JSON.stringify(data));
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

export const updateSubservice = createAsyncThunk(
	"service/updateSubservice",
	async (data, thunkAPI) => {
		try {
			const serviceId = data.id;
			const response = await mainApi.patch(`/services/${serviceId}/`, JSON.stringify(data));
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const deleteService = createAsyncThunk(
	"service/deleteService",
	async (serviceId, thunkAPI) => {
		try {
			const response = await mainApi.delete(`/services/${serviceId}/`);
			return serviceId;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

const initialState = {
	subservices: [],
	mainService: {},
	radius: 0,
	price: 0,
	capacity: 0
};

export const serviceSlice = createSlice({
	name: "service",
	initialState,
	reducers: {
		clearService(state) {
			return {
				...initialState,
				services: state.services
			};
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchSubservices.fulfilled, (state, action) => {
			if (!action.payload.length) return state;
			state.subservices = action.payload.map(
				({ id, short_title, short_description, photos }) => ({
					id,
					name: short_title,
					description: short_description,
					imageUrl: photos[0]?.image
				})
			);
		});

		builder.addCase(updateSubservice.fulfilled, (state, action) => {
			const { id, short_title, short_description } = action.payload || {};
			state.subservices = state.subservices.map(item => {
				if (item.id === id) {
					return {
						...item,
						name: short_title,
						description: short_description
					};
				}
				return item;
			});
		});

		builder.addCase(fetchMainService.fulfilled, (state, action) => {
			const { photos, short_description, short_title, id } = action.payload || {};
			state.mainService = {
				imageUrl: photos?.[0]?.image,
				name: short_title,
				description: short_description,
				id
			};
		});

		builder.addCase(fetchServices.fulfilled, (state, action) => {
			state.services = action.payload.map(({ id, type }) => ({ id, type }));
		});

		builder.addCase(deleteService.fulfilled, (state, action) => {
			state.subservices = state.subservices.filter(({ id }) => id !== action.payload);
		});

		builder.addCase(logout, () => {
			return initialState;
		});

		builder.addMatcher(
			isAnyOfType(fetchService.fulfilled, addService.fulfilled, updateService.fulfilled),
			(state, action) => {
				const {
					description,
					location_title = "",
					location_description = "",
					id,
					name,
					price = 0,
					short_description,
					short_title,
					service_radius,
					capacity = 0,
					company
				} = action.payload;

				state.id = id;
				state.price = price;
				state.capacity = capacity;
				state.locationTitle = location_title;
				state.locationDescription = location_description;
				state.radius = service_radius;
				state.companyDescription = short_description;
				state.shortTitle = short_title;
				state.title = name;
				state.description = description;
				state.companyId = company;
			}
		);
	}
});

export const { clearService } = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
