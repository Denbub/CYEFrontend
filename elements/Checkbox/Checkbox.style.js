import { INPUT_BORDER, LINK_COLOR } from "colors";
import styled, { css } from "styled-components";

import { breakpoints } from "constant";

export const Checkbox = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 3px;
	margin-right: 13px;
	border: 1px solid ${INPUT_BORDER};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
`;
const getCheckboxLabelStyles = ({ customStyle }) => {
	switch (customStyle) {
		case "smallSize":
			return css`
				@media screen and (min-width: ${breakpoints.LAPTOP}) {
					font-size: 16px;
					line-height: 24px;
				}
			`;
		default:
			return css`
				@media screen and (min-width: ${breakpoints.LAPTOP}) {
					font-size: 18px;
					line-height: 28px;
				}
			`;
	}
};
export const CheckboxLabel = styled.div`
	font-size: 14px;
	line-height: 19px;

	${getCheckboxLabelStyles}

	a {
		color: ${LINK_COLOR};
	}
`;
export const CheckboxHolder = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-bottom: 6px;
`;
export const CheckboxWrapper = styled.div`
	margin-top: 26px;
	margin-bottom: 19px;
`;
