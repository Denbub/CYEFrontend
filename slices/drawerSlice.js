import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
	name: "drawer",
	initialState: {
		opened: false
	},
	reducers: {
		openDrawer: state => {
			state.opened = true;
		},
		closeDrawer: state => {
			state.opened = false;
		}
	}
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;
