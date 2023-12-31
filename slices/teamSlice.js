import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { mainApi } from "services/axios";

import { saveFileAction } from "utilities";

import { getCompanyId } from "selectors";

import { logout } from "./userSlice";

export const fetchTeam = createAsyncThunk("service/fetchTeam", async (companyId, thunkAPI) => {
	try {
		const response = await mainApi.get(`/companies/${companyId}/members/`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

export const addTeamMember = createAsyncThunk(
	"service/addTeamMember",
	async ({ name, position, summary, newImg }, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());

			if (companyId) {
				const formData = new FormData();
				newImg && formData.append("image", newImg);
				formData.append("name", name);
				formData.append("position", position);
				formData.append("summary", summary);
				const response = await mainApi.post(`/companies/${companyId}/members/`, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				});
				return response.data;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const addTeamMemberJson = createAsyncThunk(
	"service/addTeamMemberJson",
	async (data, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());

			if (companyId) {
				const response = await mainApi.post(
					`/companies/${companyId}/members/`,
					JSON.stringify(data)
				);
				return response.data;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const updateTeamMemberJson = createAsyncThunk(
	"service/updateTeamMemberJson",
	async (data, thunkAPI) => {
		try {
			const { id } = data;
			const companyId = getCompanyId(thunkAPI.getState());
			if (companyId) {
				const response = await mainApi.patch(
					`/companies/${companyId}/members/${id}/`,
					JSON.stringify(data)
				);
				return response.data;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const updateTeamMember = createAsyncThunk(
	"service/updateTeamMember",
	async ({ name, position, summary, img, id }, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());
			if (companyId) {
				if (img === null) {
					const response = await mainApi.patch(
						`/companies/${companyId}/members/${id}/`,
						JSON.stringify({ image: img })
					);
					return response.data;
				} else {
					const formData = new FormData();
					img && formData.append("image", img);
					name && formData.append("name", name);
					position && formData.append("position", position);
					summary && formData.append("summary", summary);
					const response = await mainApi.patch(
						`/companies/${companyId}/members/${id}/`,
						formData,
						{
							headers: {
								"Content-Type": "multipart/form-data"
							}
						}
					);
					return response.data;
				}
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const deleteTeamMember = createAsyncThunk(
	"service/deleteTeamMember",
	async (id, thunkAPI) => {
		try {
			const companyId = getCompanyId(thunkAPI.getState());
			if (companyId) {
				const response = await mainApi.delete(`/companies/${companyId}/members/${id}/`);
				return response.data;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const saveTeamImage = createAsyncThunk("drawer/saveTeamImage", async (data, thunkAPI) => {
	const { id, file, fieldName } = data;
	const companyId = getCompanyId(thunkAPI.getState());
	return saveFileAction(`/companies/${companyId}/members/${id}/`, file, fieldName);
});

const initialState = { teamMembers: [], loading: false };

export const teamSlice = createSlice({
	name: "teamSlice",
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchTeam.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchTeam.rejected, (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		});
		builder.addCase(fetchTeam.fulfilled, (state, action) => {
			state.teamMembers = action.payload;
			state.loading = false;
		});

		builder.addCase(deleteTeamMember.fulfilled, (state, action) => {
			state.teamMembers = state.teamMembers.filter(({ id }) => id !== action.meta.arg);
		});

		builder.addCase(logout, () => {
			return initialState;
		});

		builder.addMatcher(
			isAnyOf(addTeamMember.fulfilled, addTeamMemberJson.fulfilled),
			(state, action) => {
				state.teamMembers = [...state.teamMembers, action.payload];
			}
		);
		builder.addMatcher(
			isAnyOf(
				updateTeamMember.fulfilled,
				updateTeamMemberJson.fulfilled,
				saveTeamImage.fulfilled
			),
			(state, action) => {
				const updatedTeamMember = action.payload;
				state.teamMembers = state.teamMembers.map(teamMember => {
					if (updatedTeamMember.id === teamMember.id) {
						return updatedTeamMember;
					}
					return teamMember;
				});
			}
		);
	}
});

export const teamReducer = teamSlice.reducer;
