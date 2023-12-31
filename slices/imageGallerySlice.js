import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { mainApi } from "services/axios";
import { isAnyOfType } from "utilities/sliceHelpers";

import { getCompanyId } from "selectors";

import { fetchCompany } from "./companySlice";
import { fetchService } from "./serviceSlice";

export const addImage = createAsyncThunk("service/addImage", async ({ image, order }, thunkAPI) => {
	try {
		const state = thunkAPI.getState();
		const serviceId = state.service.id;
		const companyId = getCompanyId(state);

		const formData = new FormData();
		formData.append("image", image);
		formData.append("order", order);

		let requestUrl = `/services/${serviceId}/photos/`;

		if (!serviceId) {
			requestUrl = `/companies/${companyId}/photos/`;
		}

		const response = await mainApi.post(requestUrl, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		return { image: response.data, serviceGallery: !!serviceId };
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

export const removeImage = createAsyncThunk("service/removeImage", async (imageId, thunkAPI) => {
	try {
		const state = thunkAPI.getState();
		const serviceId = state.service.id;
		const companyId = getCompanyId(state);

		let requestUrl = `/services/${serviceId}/photos/${imageId}/`;

		if (!serviceId) {
			requestUrl = `/companies/${companyId}/photos/${imageId}/`;
		}

		await mainApi.delete(requestUrl);
		return { serviceGallery: !!serviceId };
	} catch (error) {
		return thunkAPI.rejectWithValue({ error: error.message });
	}
});

const images = [{ order: 0 }, { order: 1 }, { order: 2 }, { order: 3 }, { order: 4 }];

const initialState = {
	images
};

const getImages = photos => {
	if (photos.length) {
		return images.map(item => {
			const image = photos.find(({ order }) => order === item.order);
			if (image) {
				return image;
			}
			return item;
		});
	}
	return images;
};

export const imageGallerySlice = createSlice({
	name: "imageGallery",
	initialState,
	reducers: {
		clearImageGallery() {
			return initialState;
		}
	},
	extraReducers: builder => {
		builder.addCase(addImage.fulfilled, (state, action) => {
			const newImage = action.payload.image;
			state.images = state.images.map(item =>
				item.order === newImage.order ? newImage : item
			);
		});

		builder.addCase(removeImage.fulfilled, (state, action) => {
			const imageId = action.meta.arg;
			state.images = state.images.map(item => {
				if (item.id === imageId) {
					return { order: item.order };
				}
				return item;
			});
		});

		builder.addMatcher(
			isAnyOfType(fetchService.fulfilled, fetchCompany.fulfilled),
			(state, { payload }) => {
				state.images = getImages(payload.photos);
			}
		);
	}
});

export const { clearImageGallery } = imageGallerySlice.actions;
export const imageGalleryReducer = imageGallerySlice.reducer;
