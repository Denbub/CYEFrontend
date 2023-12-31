import { createSlice } from "@reduxjs/toolkit";

export const dropdownsSlice = createSlice({
	name: "dropdowns",
	initialState: {
		activeDropdownId: ""
	},
	reducers: {
		setActiveDropdownId: (state, action) => {
			if (action.payload === state.activeDropdownId) {
				state.activeDropdownId = "";
			} else {
				state.activeDropdownId = action.payload;
			}
		}
	}
});

export const { setActiveDropdownId } = dropdownsSlice.actions;
export const dropdownReducer = dropdownsSlice.reducer;
