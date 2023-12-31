import axios from "axios";
import https from "https";
import Cookies from "js-cookie";
import getConfig from "next/config";
import router from "next/router";

import { routes } from "routes";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const mainApi = axios.create({
	baseURL:
		publicRuntimeConfig.API_URL || serverRuntimeConfig.BASE_URL || publicRuntimeConfig.BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
		requestCert: true,
		keepAlive: true
	})
});

const stripeApi = axios.create({
	baseURL: "https://etachxjgkl.execute-api.eu-central-1.amazonaws.com"
});

const token = Cookies.get("token");

export const removeBearerToken = () => {
	Cookies.remove("token");
	delete mainApi.defaults.headers.Authorization;
};

if (token) {
	mainApi.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export const addBearerToken = (token, expired) => {
	if (token) {
		const expiredDate = new Date(expired * 1000);
		Cookies.set("token", token, { expires: expiredDate });
		mainApi.defaults.headers.Authorization = `Bearer ${token}`;
	}
};

mainApi.interceptors.response.use(
	response => response,
	function (error) {
		if (error.response?.status === 401) {
			removeBearerToken();
			router.push(routes.login);
		} else {
			// eslint-disable-next-line no-undef
			return Promise.reject(error);
		}
	}
);

export { mainApi, stripeApi };
