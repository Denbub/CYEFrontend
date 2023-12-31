import axios from "axios";
import getConfig from "next/config";
import qs from "qs";

const { publicRuntimeConfig } = getConfig();

const instance = axios.create({
	baseURL: publicRuntimeConfig.BASE_URL,
	timeout: 5000
});

export const API = {
	get: async (url, params) => {
		return await instance
			.get(`${url}?${qs.stringify(params)}`)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				console.log(error);
				return error.response?.data.error;
			});
	}
};
