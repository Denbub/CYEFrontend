import styled, { css } from "styled-components";

import { FAQ_BORDER_COLOR, FAQ_PLUS_COLOR } from "colors";
import { breakpoints } from "constant";
import { getFontSize, getFontWeight } from "styleHelpers";

import DynamicTitle from "elements/DynamicTitle";

export const FAQWrapper = styled.div`
	display: flex;
	@media screen and (max-width: ${breakpoints.TABLET}) {
		flex-direction: column;
	}
`;

export const FAQItem = styled.div`
	padding: 28px 0;
	border-bottom: 1px solid ${FAQ_BORDER_COLOR};
`;
const getFontStyles = ({ fontSize, fontWeight }) => {
	return css`
		font-size: ${fontSize ? getFontSize(fontSize) : "18px"};
		font-weight: ${fontWeight ? getFontWeight(fontWeight) : "400"};
	`;
};

export const FAQItemTitle = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 600;
	cursor: pointer;
	font-size: 24px;
	line-height: 32px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		font-size: 28px;
		line-height: 34px;
	}
`;

export const FAQItemDescription = styled.div`
	display: ${({ active }) => (active ? "block" : "none")};
	margin-top: 24px;
	${getFontStyles}
`;

export const FAQTitle = styled(DynamicTitle)`
	@media screen and (max-width: ${breakpoints.MOBILE}) {
		text-align: center;
		margin-bottom: 30px;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		padding-right: 140px;
		padding-top: 18px;
		margin-bottom: 52px;
	}
`;
export const IconPlus = styled.div`
	position: relative;
	padding-left: 70px;
	&::before {
		${({ active }) => (active ? 'content: "-"' : 'content: "+"')};
		font-size: 29px;
		color: ${FAQ_PLUS_COLOR};
	}
`;
