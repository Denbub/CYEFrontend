import styled, { css } from "styled-components";

import { breakpoints } from "constant";

import DynamicTitle from "elements/DynamicTitle";

import { getFontSize, getFontWeight } from "styleHelpers";

export const ButtonHolder = styled.div`
	margin-top: 40px;

	button {
		width: auto;
	}
	@media screen and (max-width: ${breakpoints.TABLET}) {
		display: flex;
		justify-content: center;
	}
`;

export const HeaderWrapper = styled.div`
	background: ${({ image }) => `url(${image}) no-repeat`};
	background-size: cover;
	background-position: center;
	padding: 180px 0 160px;
	text-align: left;
	color: white;
	position: relative;
`;

export const HeaderTitle = styled(DynamicTitle)`
	letter-spacing: 0;
	font-family: "Poppins", sans-serif;
	text-transform: none;
	text-align: center;
	margin-bottom: 20px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		text-align: left;
	}
`;

const getHeaderDescriptionStyles = ({ fontSize, fontWeight }) => {
	return css`
		font-size: ${fontSize ? getFontSize(fontSize) : "18px"};
		font-weight: ${fontWeight ? getFontWeight(fontWeight) : "400"};
	`;
};

export const HeaderDescription = styled.div`
	font-weight: 400;
	font-family: "Poppins", sans-serif;
	font-size: 16px;
	line-height: 24px;
	text-align: center;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 60%;
		line-height: 28px;
		text-align: left;
		${getHeaderDescriptionStyles}
	}
`;
