import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

import { addBearerToken, mainApi } from "services/axios";
import { currentSession, getUser } from "utilities/auth";

export const fetchUserSession = createAsyncThunk("user/fetchUserSession", async (_, thunkAPI) => {
	try {
		const userData = await getUser().then(data => data);
		const token = userData.signInUserSession.idToken.jwtToken;
		const expired = userData.signInUserSession.idToken.payload.exp;
		addBearerToken(token, expired);
		if (userData.signInUserSession) {
			return {
				token,
				expired
			};
		}
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

export const updateSession = createAsyncThunk("user/updateSession", async (_, thunkAPI) => {
	try {
		const userData = await currentSession().then(data => data);

		if (userData) {
			return {
				token: userData.idToken.jwtToken,
				expired: userData.idToken.payload.exp
			};
		}
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

export const updateUser = createAsyncThunk("user/updateUser", async (payload, thunkAPI) => {
	try {
		const id = thunkAPI.getState().user.profile.id;
		const response = await mainApi.patch(`users/me/ `, payload);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
	try {
		const response = await mainApi.get("/users/me/");
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

const initialState = {
	token: Cookies.get("token"),
	profile: null
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		logout: state => {
			return { ...initialState, token: null };
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchUser.pending, state => {
			state.profile = null;
			state.loading = true;
		});
		builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
			state.profile = payload;
			state.loading = false;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.token = null;
			state.profile = null;
			state.error = action.error.message;
			state.loading = false;
		});
		builder.addCase(fetchUserSession.pending, state => {
			state.profile = null;
			state.loading = true;
		});
		builder.addCase(fetchUserSession.fulfilled, (state, { payload }) => {
			if (payload) {
				state.token = { ...payload };
				state.loading = false;
			}
		});
		builder.addCase(fetchUserSession.rejected, (state, action) => {
			state.token = null;
			state.profile = null;
			state.error = "";
			state.loading = false;
		});
		builder.addCase(updateSession.pending, state => {
			state.profile = null;
			state.loading = true;
		});
		builder.addCase(updateSession.fulfilled, (state, { payload }) => {
			if (payload) {
				state.token = { ...payload };
				state.loading = false;
			}
		});
		builder.addCase(updateSession.rejected, (state, action) => {
			state.token = null;
			state.profile = null;
			state.error = "";
			state.loading = false;
		});
	}
});

export const selectUser = createSelector(
	state => ({
		...state.user
	}),
	state => state
);

export const getLoggedIn = createSelector(
	state => ({
		...state.user
	}),
	user => !!user.token
);

export const { setToken, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
