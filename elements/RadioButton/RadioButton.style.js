import styled, { css } from "styled-components";

import { ACCENT, INPUT_BORDER, TEXT_GREY_DARK } from "colors";

import { transparentize } from "styleHelpers";

const getRadioButtonInputStyle = ({ changeOrder }) => {
	if (changeOrder) {
		return css`
			order: 2;
			margin: 0;
		`;
	}
	return null;
};
export const RadioButtonInput = styled.label`
	width: 20px;
	height: 20px;
	margin-right: 13px;
	border: 1px solid ${INPUT_BORDER};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	${getRadioButtonInputStyle};
`;

export const CheckedIcon = styled.div`
	width: 8px;
	border-radius: 50%;
	height: 8px;
	background: ${ACCENT};
`;

const getButtonLabelStyles = ({ column }) =>
	column &&
	css`
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	`;

export const RadioButtonLabel = styled.label`
	font-size: 16px;
	line-height: 24px;
	cursor: pointer;
	line-height: 19px;
	${({ changeOrder }) => (changeOrder ? "order:1" : "")};
	color: ${TEXT_GREY_DARK};
	&[disabled] {
		color: ${transparentize(TEXT_GREY_DARK, 0.6)};
		img {
			opacity: 0.6;
		}
	}
	${getButtonLabelStyles}

	img {
		margin-bottom: 12px;
	}
`;
const getHolderStyles = ({ column }) =>
	column &&
	css`
		flex-direction: column;
	`;
export const RadioButtonHolder = styled.div`
	display: flex;
	align-items: center;
	margin-top: 26px;
	margin-bottom: 19px;

	${getHolderStyles}
`;
export const Input = styled.input`
	position: absolute;
	z-index: -1;
	opacity: 0;
`;
