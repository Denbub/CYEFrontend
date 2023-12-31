import styled, { css } from "styled-components";

import { breakpoints } from "constant";
import { getFontSize, getFontWeight, getTextAlight } from "styleHelpers";

import DynamicTitle from "elements/DynamicTitle";

const getDynamicStyles = ({ fontSize, textAlign, fontWeight }) => {
	return css`
		font-size: ${getFontSize(fontSize)};
		text-align: ${getTextAlight(textAlign)};
		font-weight: ${getFontWeight(fontWeight)};
	`;
};

export const Title = styled(DynamicTitle)`
	letter-spacing: 0em;
	text-align: center;
	margin-bottom: 20px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		text-align: left;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-bottom: 40px;
	}
`;

export const Description = styled.div`
	${getDynamicStyles}
	line-height: 28px;
	letter-spacing: 0em;
	margin-bottom: 20px;
	white-space: pre-line;

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-bottom: 40px;
	}
`;
