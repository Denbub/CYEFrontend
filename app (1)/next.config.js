/** @type {import('next').NextConfig} */

const HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:3000";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";
const COGNITO_AUTH_URL = process.env.NEXT_PUBLIC_COGNITO_AUTH_URL || "";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || "";
const REDIRECT_URL = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URL || "";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const COGNITO_USER_POOL = process.env.COGNITO_USER_POOL || "";
const COGNITO_APP_ID = process.env.COGNITO_APP_ID || "";
const COGNITO_AWS_REGION = process.env.COGNITO_AWS_REGION || "";
const NEXT_PUBLIC_GOOGLE_MAPS_API = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || "";
const IS_PROD = process.env.IS_PROD === "true" || false;

const { i18n } = require("./next-i18next.config");

const headers = async () => {
	return [
		{
			source: "/(.*)",
			headers: [
				{
					key: "X-Content-Type-Options",
					value: "nosniff"
				},
				{
					key: "X-Frame-Options",
					value: "SAMEORIGIN"
				},
				{
					key: "X-XSS-Protection",
					value: "1; mode=block"
				},
				{
					key: "Strict-Transport-Security",
					value: "max-age=63072000; includeSubDomains; preload"
				}
			]
		}
	];
};

module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	i18n,
	images: {
		loader: "default",
		domains: ["lp.strudle.co", "localhost", "files.strudle.co", "cdn.strudle.co"]
	},
	publicRuntimeConfig: {
		HOSTNAME,
		BASE_URL: API_BASE_URL,
		COGNITO_AUTH_URL,
		CLIENT_ID,
		REDIRECT_URL,
		API_URL: BASE_URL,
		COGNITO_USER_POOL,
		COGNITO_APP_ID,
		COGNITO_AWS_REGION,
		NEXT_PUBLIC_GOOGLE_MAPS_API,
		IS_PROD
	},
	headers,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\b(?!.style\b).[jt]sx?$/,
			use: ["@svgr/webpack"]
		});
		return config;
	}
};
