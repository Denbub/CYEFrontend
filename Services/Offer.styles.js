import styled, { css } from "styled-components";

import { breakpoints } from "constant";

import { getFontSize, getFontWeight } from "styleHelpers";

const getFontStyles = ({ fontSize, fontWeight }) => {
	return css`
		font-size: ${fontSize ? getFontSize(fontSize) : "44px"};
		font-weight: ${fontWeight ? getFontWeight(fontWeight) : "700"};
	`;
};

export const OfferItem = styled.div`
	position: relative;
	width: 100%;
	text-align: right;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		padding-right: 30px;
	}
`;

export const OfferDescription = styled.div`
	font-family: "Poppins", sans-serif;
	display: flex;
	align-items: center;
	text-align: left;
	white-space: break-spaces;
	font-size: 28px;
	font-weight: 600;
	line-height: 34px;
	text-align: center;
	padding-bottom: 20px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		line-height: 55px;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 66%;
		z-index: 10;

		${getFontStyles}
	}
`;

export const OfferWrapper = styled.div`
	height: 255px;

	@media screen and (max-width: ${breakpoints.TABLET}) {
		height: 420px;
		margin: 0;
	}
`;
export const OfferImage = styled.div`
	span {
		max-width: 100% !important;
	}
	@media screen and (max-width: ${breakpoints.TABLET}) {
		span {
			width: 100% !important;
			height: 160px !important;
		}
	}
`;
