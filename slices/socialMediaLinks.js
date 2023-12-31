import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { mainApi } from "services/axios";

import { getCompanyId } from "selectors";

import { logout } from "./userSlice";

export const fetchSocialMediaLinksConfig = createAsyncThunk(
	"socialMediaLinks/fetchSocialMediaLinksConfig",
	async (_, thunkAPI) => {
		try {
			const response = await mainApi.get(`/companies/socials/`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const fetchSocialMediaLinks = createAsyncThunk(
	"socialMediaLinks/fetchSocialMediaLinks",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.get(`/companies/${companyId}/socials/`);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const addSocialMediaLinks = createAsyncThunk(
	"socialMediaLinks/addSocialMediaLinks",
	async (data, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());

			const response = await mainApi.post(`/companies/${companyId}/socials/`, data);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const deleteSocialMediaLinks = createAsyncThunk(
	"socialMediaLinks/deleteSocialMediaLinks",
	async (id, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());
			const response = await mainApi.delete(`/companies/${companyId}/socials/${id}/`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const updateSocialMediaLinks = createAsyncThunk(
	"socialMediaLinks/updateSocialMediaLinks",
	async (data, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());
			const response = await mainApi.put(`/companies/${companyId}/socials/`, data);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

const initialState = {
	config: {},
	links: []
};

export const socialMediaLinksSlice = createSlice({
	name: "socialMediaLinks",
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchSocialMediaLinksConfig.fulfilled, (state, action) => {
			state.config = action.payload.reduce((acc, curr) => {
				acc[curr.id] = curr;
				return acc;
			}, {});
		});

		builder.addCase(fetchSocialMediaLinks.fulfilled, (state, action) => {
			state.links = action.payload;
		});

		builder.addCase(addSocialMediaLinks.fulfilled, (state, action) => {
			state.links = [...state.links, ...action.payload];
		});

		builder.addCase(deleteSocialMediaLinks.fulfilled, (state, action) => {
			state.links = state.links.filter(({ id }) => id !== action.meta.arg);
		});

		builder.addCase(updateSocialMediaLinks.fulfilled, (state, action) => {
			state.links = action.payload;
		});

		builder.addCase(logout, () => {
			return initialState;
		});
	}
});

export const socialMediaLinksReducer = socialMediaLinksSlice.reducer;
