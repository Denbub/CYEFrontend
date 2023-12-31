import styled, { css } from "styled-components";

import { ACCENT, GREY } from "colors";

export const StepperWrapper = styled.div`
	position: absolute;
	top: -28px;
	border-top: 1px solid ${GREY};
	width: 100%;

	display: grid;
	grid-template-columns: ${({ steps }) => `repeat(${steps}, 1fr)`};
`;

const getLastActive = ({ lastActive }) =>
	lastActive &&
	css`
		&:before {
			position: absolute;
			right: 0;
			top: -2px;
			width: 3px;
			height: 3px;
			background: ${ACCENT};
			content: "";
			border-radius: 50%;
		}
	`;

export const Step = styled.div`
	position: relative;
	top: -1px;
	border-top: ${({ active }) => `1px solid ${active ? ACCENT : GREY};`};
	${getLastActive}
`;
