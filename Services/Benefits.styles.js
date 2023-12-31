import styled, { css } from "styled-components";

import { BENEFITS_BACKGROUND, BENEFITS_BORDER, BENEFITS_LINE_BACKGROUND } from "colors";
import { breakpoints } from "constant";
import { getFontSize, getFontWeight } from "styleHelpers";

import DynamicTitle from "elements/DynamicTitle";

export const BenefitsList = styled.div`
	display: grid;
	grid-auto-rows: 1fr;
`;

export const BenefitsItem = styled.div`
	background: ${BENEFITS_BACKGROUND};
	border: 1px solid ${BENEFITS_BORDER};
	border-radius: 10px;
	position: relative;
	box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.07);
	max-width: 100%;
	cursor: pointer;
	padding: 20px 10px;

	&::before {
		width: 76px;
		height: 5px;
		position: absolute;
		left: 45px;
		content: "";
		background-color: ${BENEFITS_LINE_BACKGROUND};
		border-radius: 20px;
		top: -3px;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		padding: 24px 40px;
	}
`;

export const BenefitsTitle = styled(DynamicTitle)`
	text-align: center;
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		text-align: left;
	}
`;

export const BenefitsWrapper = styled.div`
	margin: 0 auto;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
`;

export const BenefitTitle = styled.div`
	font-weight: 700;

	@media screen and (max-width: 768px) {
		font-size: 24px;
		line-height: 32px;
	}
	@media screen and (min-width: 769px) {
		font-size: 28px;
		line-height: 34px;
	}
`;

const getBenefitDescriptionStyles = ({ fontSize, fontWeight }) => {
	return css`
		font-size: ${fontSize ? getFontSize(fontSize) : "18px"};
		font-weight: ${fontWeight ? getFontWeight(fontWeight) : "400"};
	`;
};
export const BenefitDescription = styled.div`
	display: ${({ active }) => (active ? "block" : "none")};
	margin-top: 16px;
	${getBenefitDescriptionStyles}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin-top: 8px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-top: 22px;
	}
`;

export const BenefitIcon = styled.div`
	display: flex;
	margin-bottom: 22px;
	width: 60px;
	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin-bottom: 48px;
	}
`;
