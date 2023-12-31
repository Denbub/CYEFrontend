import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainApi } from "services/axios";

import { getCompanyId } from "selectors";

export const fetchDocuments = createAsyncThunk(
	"documents/fetchDocuments",
	async (companyId, thunkAPI) => {
		try {
			const response = await mainApi.get(`/companies/${companyId}/documents/`);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		}
	}
);

export const saveDocuments = createAsyncThunk("documents/saveFile", async (documents, thunkAPI) => {
	const companyId = getCompanyId(thunkAPI.getState());
	const url = `/companies/${companyId}/documents/`;
	let resp = [];
	const config = {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	};
	for (const [fieldName, { file, id }] of Object.entries(documents)) {
		const formData = new FormData();
		formData.append("name", fieldName);
		formData.append("document", file);
		const response = id
			? await mainApi.patch(`${url}${id}/`, formData, config)
			: await mainApi.post(url, formData, config);
		resp.push(response.data);
	}
	return resp;
});

export const deleteDocument = createAsyncThunk("documents/deleteDocument", async (id, thunkAPI) => {
	const companyId = getCompanyId(thunkAPI.getState());
	const response = await mainApi.delete(`/companies/${companyId}/documents/${id}/`);
	return response.data;
});

const initialState = {
	documents: {
		dataProtect: {},
		rightToObject: {},
		imprint: {}
	},
	loading: false
};

const documentsSlice = createSlice({
	name: "documents",
	initialState,
	reducers: {
		clearDocuments() {
			return initialState;
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchDocuments.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchDocuments.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		builder.addCase(fetchDocuments.fulfilled, (state, action) => {
			state.loading = false;
			let documents = {};
			action.payload.map(item => {
				documents[item.name] = {
					id: item.id,
					url: item.document,
					name: item.document.split("/").pop()
				};
			});
			state.documents = documents;
		});
		builder.addCase(saveDocuments.fulfilled, (state, action) => {
			const documents = state.documents;
			action.payload.map(file => {
				documents[file.name] = {
					id: file.id,
					url: file.document,
					name: file.document.split("/").pop()
				};
			});

			state.documents = documents;
		});
		builder.addCase(deleteDocument.fulfilled, (state, action) => {
			let documents = state.documents;
			for (const [key, value] of Object.entries(state.documents)) {
				if (value.id === action.meta.arg) {
					documents[key] = {};
				}
			}
			state.documents = documents;
		});
	}
});

export const { clearDocuments } = documentsSlice.actions;
export const documentsReducer = documentsSlice.reducer;
