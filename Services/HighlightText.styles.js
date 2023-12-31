import styled, { css } from "styled-components";

import { breakpoints } from "constant";
import { getFontSize, getFontWeight, getTextAlight } from "styleHelpers";

import DynamicTitle from "elements/DynamicTitle";
import Container from "elements/v2/Container";

const getFontStyles = ({ fontSize, fontWeight, textAlign }) => {
	return css`
		${fontSize && `font-size: ${getFontSize(fontSize)}`};
		${fontWeight && `font-weight: ${getFontWeight(fontWeight)}`};
		${textAlign && `text-align: ${getTextAlight(textAlign)}`};
	`;
};

export const HighlightTextTitle = styled(DynamicTitle)`
	text-align: center;
	margin-bottom: 24px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin-bottom: 20px;
	}
	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-bottom: 30px;
	}
`;

export const HighlightTextDescription = styled.div`
	font-size: 16px;
	font-weight: 400;
	line-height: 28px;
	letter-spacing: 0em;
	text-align: center;
	${getFontStyles};

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		font-size: 18px;
		font-weight: 500;
		line-height: 34px;
		${getFontStyles};
	}
`;
export const ButtonHolder = styled.div`
	margin-top: 40px;
	button {
		width: auto;
		margin: 0 auto;
	}
`;

const commonBgStyles = css`
	content: "";
	position: absolute;
	left: 0;
	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
`;

const getInfoBlockWrapperStyles = ({ withBackground }) => {
	if (withBackground) {
		return css`
			position: relative;
			padding-top: 45px;

			&::before {
				top: 0;
				height: 45px;
				background-image: url("/icons/circles/mobile.svg");
				${commonBgStyles};
			}

			@media screen and (min-width: ${breakpoints.TABLET}) {
				padding: 29px 0;

				&::before {
					top: 0;
					height: 29px;
					background-image: url("/icons/circles/tabletTop.svg");
					${commonBgStyles};
				}

				&::after {
					bottom: 0;
					height: 29px;
					background-image: url("/icons/circles/tabletBottom.svg");
					${commonBgStyles};
				}
			}

			@media screen and (min-width: ${breakpoints.LAPTOP}) {
				padding: 120px 0;

				&::before {
					top: 0;
					height: 120px;
					background-image: url("/icons/circles/desktopTop.svg");
					${commonBgStyles};
				}

				&::after {
					bottom: 0;
					height: 120px;
					background-image: url("/icons/circles/desktopBottom.svg");
					${commonBgStyles};
				}
			}
		`;
	}

	return null;
};

const getInfoBlockHolderStyles = ({ withBackground }) => {
	if (withBackground) {
		return css`
			padding-top: 38px;

			@media screen and (min-width: ${breakpoints.TABLET}) {
				padding: 54px 0 37px;
			}
			@media screen and (min-width: ${breakpoints.LAPTOP}) {
				padding: 94px 0;
			}
		`;
	}

	return null;
};

export const HighlightTextHolder = styled.div`
	${getInfoBlockHolderStyles};
`;

export default styled(Container)`
	${getInfoBlockWrapperStyles};
`;
