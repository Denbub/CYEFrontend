import {
	BUTTON_BG,
	BUTTON_DARK_BG,
	BUTTON_TEXT,
	BUTTON_WHITE_BG,
	BUTTON_WHITE_TEXT,
	GREY
} from "colors";

import styled, { css } from "styled-components";
import { transparentize } from "styleHelpers";

const getButtonStyles = ({ color, disabled }) => {
	switch (color) {
		case "black":
			return css`
				background: ${BUTTON_DARK_BG};
				color: ${BUTTON_TEXT};
				&[disabled] {
					background: ${transparentize(BUTTON_DARK_BG, 0.6)};
					color: ${transparentize(BUTTON_TEXT, 0.6)};
				}
			`;
		case "white":
			return css`
				background: ${BUTTON_WHITE_BG};
				color: ${BUTTON_WHITE_TEXT};
				&[disabled] {
					background: ${transparentize(BUTTON_WHITE_BG, 0.6)};
					color: ${transparentize(BUTTON_WHITE_TEXT, 0.6)};
				}
			`;
		case "grey":
			return css`
				background: ${GREY};
				color: ${BUTTON_TEXT};
				&[disabled] {
					background: ${transparentize(GREY, 0.6)};
					color: ${transparentize(BUTTON_TEXT, 0.6)};
				}
			`;
		default:
			return css`
				background: ${BUTTON_BG};
				color: ${BUTTON_TEXT};
				&[disabled] {
					background: ${transparentize(BUTTON_BG, 0.6)};
					color: ${transparentize(BUTTON_TEXT, 0.6)};
				}
			`;
	}
};

export default styled.button`
	${getButtonStyles}
	font-family: "Poppins";
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 42px;
	border: none;
	border-radius: 150px;
	padding: 14px 24px;
	font-size: 16px;
	line-height: 22px;
	font-weight: 600;
	cursor: pointer;
	width: ${({ width }) => (width ? `${width}px` : "100%")};
	max-width: 100%;
`;
