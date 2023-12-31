import { css } from "styled-components";

export const getCssTruncateLines = truncateLines =>
	truncateLines &&
	css`
		display: block; /* Fallback for non-webkit */
		display: -webkit-box;
		-webkit-line-clamp: ${truncateLines};
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
	`;

export const transparentize = (color, alphaValue) => {
	if (!alphaValue || typeof alphaValue !== "number" || typeof color !== "string") {
		return color;
	}

	const parseColor = color.match(/(\d{1,3}), (\d{1,3}), (\d{1,3})/);
	const parsedColor = parseColor && parseColor[0];

	return `rgba(${parsedColor}, ${alphaValue})`;
};

export const getFontSize = fontSize => {
	switch (fontSize) {
		case "18":
			return "18px";
		case "16":
			return "16px";
		case "12":
			return "12px";
		case "14":
		default:
			return "14px";
	}
};

export const getFontWeight = fontWeight => {
	switch (fontWeight) {
		case "m":
			return "500";
		case "b":
			return "700";
		default:
			return "400";
	}
};

export const getTextAlight = textAlign => {
	switch (textAlign) {
		case "c":
			return "center";
		case "r":
			return "right";
		case "l":
		default:
			return "left";
	}
};

export const serviceGridClassName =
	"xl:grid xl:grid-cols-[1fr_431px] xl:gap-x-md mb-[40px] xl:mb-[178px]";
