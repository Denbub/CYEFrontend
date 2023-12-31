import styled from "styled-components";

import { CLOSE_BUTTON_BG, MODAL_OVERLAY, WHITE } from "colors";
import { breakpoints } from "constant";

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: ${MODAL_OVERLAY};
	z-index: 999;
`;

export const ContentHolder = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: ${WHITE};
	border-radius: 10px;
	z-index: 1000;
	width: calc(100vw - 20px);
	padding: 45px 10px 35px;
	max-height: 100%;
	overflow-y: auto;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: auto;
		padding: 20px 0px 30px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		padding: 28px 0px 30px;
	}
`;

export const CloseButton = styled.button`
	position: absolute;
	z-index: 2;
	top: 10px;
	right: 10px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: ${CLOSE_BUTTON_BG};
	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		top: 20px;
		right: 20px;
	}
`;
