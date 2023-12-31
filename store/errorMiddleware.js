import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
/**
 * Log a warning and show a toast!
 */
export const errorMiddleware = api => next => action => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		action.error &&
			action.error.message !== "Rejected" &&
			toast.error(action.error.message, {
				position: toast.POSITION.TOP_CENTER
			});
	}

	return next(action);
};
