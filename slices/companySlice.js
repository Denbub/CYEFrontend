import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import getConfig from "next/config";
import { mainApi } from "services/axios";

import { getInitials, saveFileAction } from "utilities";
import { isAnyOfType } from "utilities/sliceHelpers";

import { getCompanyId } from "selectors";

import { routes } from "routes";
import { logout } from "./userSlice";

const { publicRuntimeConfig } = getConfig();

const HOSTNAME = publicRuntimeConfig.HOSTNAME;

export const fetchCompany = createAsyncThunk(
	"company/fetchCompany",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.get(
				companyId ? `/companies/${companyId}/` : "/companies/me/"
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const fetchCompanyUserViewData = createAsyncThunk(
	"company/fetchCompanyUserViewData",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.get(`/companies/${companyId}/`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const fetchCompanyEntryPoint = createAsyncThunk(
	"company/fetchCompanyEntryPoint",
	async (_, thunkAPI) => {
		try {
			const response = await mainApi.get("/companies/me/");

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const createCompany = createAsyncThunk(
	"company/createCompany",
	async (payload, thunkAPI) => {
		try {
			const response = await mainApi.post("/companies/", payload);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const updateCompany = createAsyncThunk(
	"company/updateCompany",
	async (payload, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());
			const response = await mainApi.patch(`/companies/${companyId}/`, payload);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const deleteCompany = createAsyncThunk(
	"company/deleteCompany",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.delete(`/companies/${companyId}/`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const getAccountLink = createAsyncThunk(
	"company/getAccountLink",
	async (payload, thunkAPI) => {
		const id = getCompanyId(thunkAPI.getState());

		try {
			const response = await mainApi.post(`/companies/${id}/account_link/`, {
				return_url: `${HOSTNAME}${routes.companyRegistration}/final`,
				refresh_url: `${HOSTNAME}${routes.companyRegistration}/refresh`
			});

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: "Technical problem" });
		}
	}
);

export const checkStatus = createAsyncThunk("company/checkStatus", async (payload, thunkAPI) => {
	const id = getCompanyId(thunkAPI.getState());

	try {
		const response = await mainApi.get(`/companies/${id}/onboarding_status/`);

		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: "Technical problem" });
	}
});

const updateImage = fieldName => async (file, thunkAPI) => {
	try {
		const companyId = getCompanyId(thunkAPI.getState());
		if (file) {
			const formData = new FormData();
			formData.append(fieldName, file);
			const response = await mainApi.patch(`/companies/${companyId}/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			return response.data;
		} else {
			const response = await mainApi.patch(
				`/companies/${companyId}/`,
				JSON.stringify({ [fieldName]: null })
			);
			return response.data;
		}
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
};

export const updateCompanyBgImage = createAsyncThunk(
	"company/updateCompanyBgImage",
	updateImage("bg_image")
);

export const updateCompanyLogo = createAsyncThunk("service/updateCompanyLogo", updateImage("logo"));

export const saveCompanyImage = createAsyncThunk(
	"drawer/saveCompanyImage",
	async (data, thunkAPI) => {
		const { file, fieldName } = data;
		const companyId = getCompanyId(thunkAPI.getState());
		return saveFileAction(`/companies/${companyId}/`, file, fieldName);
	}
);

const initialState = {
	url: "",
	companyInfo: {
		id: null,
		has_main_service: null,
		status: null,
		shortTitle: "",
		video_youtube: "",
		video_vimeo: "",
		address: ""
	},
	loading: false,
	updated: false
};

export const companySlice = createSlice({
	name: "company",
	initialState,
	reducers: {
		clearCompany() {
			return initialState;
		}
	},
	extraReducers: builder => {
		builder.addCase(createCompany.pending, state => {
			state.companyInfo = null;
			state.loading = true;
		});
		builder.addCase(createCompany.rejected, (state, action) => {
			state.companyInfo = null;
			state.error = action.error.message;
			state.loading = false;
		});
		builder.addCase(getAccountLink.pending, state => {
			state.url = "";
			state.loading = true;
		});
		builder.addCase(getAccountLink.fulfilled, (state, { payload }) => {
			state.url = payload.url;
			state.loading = false;
		});
		builder.addCase(getAccountLink.rejected, (state, action) => {
			state.url = "";
			state.error = action.error.message;
			state.loading = false;
		});
		builder.addCase(checkStatus.pending, state => {
			state.statusLoading = true;
		});
		builder.addCase(checkStatus.fulfilled, (state, { payload }) => {
			state.companyInfo.status = payload.status;
			state.statusLoading = false;
		});
		builder.addCase(checkStatus.rejected, (state, action) => {
			state.status = "";
			state.error = action.error.message;
			state.statusLoading = false;
		});
		builder.addCase(fetchCompany.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchCompany.rejected, (state, action) => {
			state.companyInfo = null;
			state.error = action.error.message;
			state.loading = false;
		});

		builder.addCase(updateCompanyBgImage.fulfilled, (state, { payload }) => {
			state.companyInfo.bg_image = payload.bg_image;
		});

		builder.addCase(updateCompany.pending, state => {
			state.loading = true;
		});

		builder.addCase(updateCompany.rejected, (state, action) => {
			state.companyInfo = null;
			state.error = action.error.message;
			state.loading = false;
		});

		builder.addCase(logout, () => {
			return initialState;
		});

		builder.addCase(fetchCompanyEntryPoint.fulfilled, (state, { payload }) => {
			state.companyInfo = {
				id: payload.id,
				shortTitle: payload.short_title,
				companyDescription: payload.short_description,
				imageUrl: payload.photos[0]?.image
			};
		});

		builder.addCase(fetchCompanyUserViewData.fulfilled, (state, { payload }) => {
			state.companyInfo = {
				id: payload.id,
				logo: payload.logo,
				initials: getInitials(payload.short_title),
				activeServices: payload.services?.length || 0,
				bg_image: payload.bg_image,
				address: payload.location_address || "",
				name: payload.name
			};
		});

		builder.addMatcher(
			isAnyOf(updateCompanyLogo.fulfilled, saveCompanyImage.fulfilled),
			(state, { payload }) => {
				state.companyInfo.logo = payload.logo;
			}
		);

		builder.addMatcher(
			isAnyOfType(fetchCompany.fulfilled, updateCompany.fulfilled, createCompany.fulfilled),
			(state, { payload }) => {
				const shortTitle = payload.short_title ?? "";
				state.companyInfo = {
					id: payload.id,
					location: payload.location_point,
					bg_image: payload.bg_image,
					logo: payload.logo,
					name: payload.name,
					radius: payload.service_radius,
					address: payload.location_address || "",
					locationTitle: payload.location_title ?? "",
					locationDescription: payload.location_description ?? "",
					has_main_service: payload.has_main_service,
					shortTitle,
					companyDescription: payload.short_description ?? "",
					video_youtube: payload.video_youtube ?? "",
					video_vimeo: payload.video_vimeo ?? "",
					title: payload.name,
					description: payload.description,
					imageUrl: payload.photos[0]?.image,
					status: payload.status,
					activeServices: payload.services?.length || 0
				};
				state.loading = false;
			}
		);
	}
});

export const { clearCompany } = companySlice.actions;
export const companyReducer = companySlice.reducer;
