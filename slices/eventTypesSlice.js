import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import { mainApi } from "services/axios";

import { getCompanyId } from "selectors";

export const fetchEventTypes = createAsyncThunk(
	"eventTypes/fetchEventTypes",
	async (payload, thunkAPI) => {
		const companyId = getCompanyId(thunkAPI.getState());
		try {
			const response = await mainApi.get(`/services/event_types?company=${companyId}`, {
				...payload
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);
export const deleteEventType = createAsyncThunk(
	"eventTypes/deleteEventType",
	async ({ id }, thunkAPI) => {
		try {
			const serviceId = thunkAPI.getState().service.id;
			if (serviceId) {
				const response = await mainApi.delete(`/services/${serviceId}/event_types/${id}/`);
				return response.data;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const addEventType = createAsyncThunk(
	"eventTypes/addEventType",
	async (eventType, thunkAPI) => {
		try {
			const serviceId = thunkAPI.getState().service.id;
			if (serviceId) {
				const response = await mainApi.post(`/services/${serviceId}/event_types/`, {
					event_type: eventType
				});
				return response.data;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

const initialState = {
	eventTypes: [],
	addedEventTypes: [],
	loading: false
};
export const eventTypesSlice = createSlice({
	name: "eventTypes",
	initialState,
	reducers: {
		clearEventTypes() {
			return initialState;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchEventTypes.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchEventTypes.fulfilled, (state, { payload }) => {
			if (payload) {
				state.eventTypes = payload;
			}

			state.loading = false;
		});
		builder.addCase(fetchEventTypes.rejected, (state, action) => {
			state.eventTypes = null;
			state.error = action.error.message;
		});
		builder.addCase(addEventType.pending, state => {
			state.loading = true;
		});
		builder.addCase(addEventType.fulfilled, (state, { payload }) => {
			if (payload) {
				state.addedEventTypes = [...state.addedEventTypes, payload];
			}

			state.loading = false;
		});
		builder.addCase(addEventType.rejected, (state, action) => {
			state.error = action.error.message;
		});
		builder.addCase(deleteEventType.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteEventType.fulfilled, (state, action) => {
			state.addedEventTypes = state.addedEventTypes.filter(
				({ id }) => id !== action.meta.arg.id
			);
			state.loading = false;
		});
		builder.addCase(deleteEventType.rejected, (state, action) => {
			state.error = action.error.message;
		});
	}
});

export const getEventTypes = createSelector(
	state => state.eventTypes,
	eventTypes => ({
		eventTypes: eventTypes.eventTypes,
		addedEventTypes: eventTypes.addedEventTypes,
		loading: eventTypes.loading
	})
);

export const { clearEventTypes } = eventTypesSlice.actions;

export const eventTypesReducer = eventTypesSlice.reducer;
