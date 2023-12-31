import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { mainApi } from "services/axios";

const LIMIT = 8;

export const searchServices = createAsyncThunk("search/searchServices", async (query, thunkAPI) => {
	try {
		const offset = query.page ? query.page * LIMIT : 0;
		const { service, category, lat, lng, radius } = query;

		const requestBody = {};

		if (service) {
			requestBody.service_templates = [service];
		}

		if (category) {
			requestBody.categories = [category];
		}

		if (lat && lng && radius) {
			requestBody.distance = {
				location: {
					lat: Number(lat),
					lng: Number(lng)
				},
				distance: radius
			};
		}

		const response = await mainApi.post(
			`/services/search/?limit=${LIMIT}&offset=${offset}`,
			requestBody
		);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

const initialState = {
	params: {
		category: null,
		service: null,
		lat: null,
		lng: null,
		radius: null,
		address: null,
		page: 0
	},
	services: [],
	totalPages: 0
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		clearSearch: () => {
			return initialState;
		},
		setSearchParams: (state, action) => {
			const params = action.payload;

			if (params.length) {
				params.forEach(({ name, value }) => {
					if (name === "category") {
						state.params.service = null;
					}

					state.params[name] = value;
				});
			}
		},
		setInitialParams: (state, action) => {
			state.params = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(searchServices.pending, state => {});
		builder.addCase(searchServices.fulfilled, (state, { payload }) => {
			state.totalPages = payload.count ? Math.ceil(payload.count / LIMIT) : 0;
			state.services = payload.results.map(
				({
					id,
					photos,
					location_address,
					short_title,
					name,
					short_description,
					company,
					type,
					location_point
				}) => {
					return {
						image: photos[0]?.image,
						address: location_address,
						location: {
							lat: location_point?.lat,
							lng: location_point?.lng,
							title: short_title
						},
						companyName: company.name,
						serviceName: name,
						description: short_description,
						id,
						type
					};
				}
			);
		});
		builder.addCase(searchServices.rejected, (state, action) => {
			console.log(action);
		});
	}
});

export const { setSearchParams, setInitialParams, clearSearch } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
