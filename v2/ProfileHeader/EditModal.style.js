import Image from "next/image";
import styled, { css } from "styled-components";

import { BUTTON_DARK_BG, BUTTON_TEXT, GRAY_BUTTON_BG } from "colors";
import { breakpoints } from "constant";

import Button from "elements/Button";

const commonButtonStyles = css`
	margin: 0 auto;
	border-radius: 50%;
	height: 40px;
	width: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${GRAY_BUTTON_BG};
	cursor: pointer;
`;

export const DeleteButton = styled.button`
	${commonButtonStyles};
`;

export const FileInput = styled.label`
	${commonButtonStyles};

	& > input {
		display: none;
	}
`;

export const Title = styled.h3`
	font-family: "Poppins";
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
	align-self: flex-start;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin-bottom: 16px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-bottom: 10px;
	}
`;

export const ButtonHolder = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const ButtonsHolder = styled.div`
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
`;

export const ButtonDescription = styled.p`
	font-family: "Poppins";
	font-size: 14px;
	margin: 0;
`;

export const ImageHolder = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-bottom: 20px;
	}
`;

export const CustomBgImageHolder = styled.div`
	position: relative;
	border-radius: 10px;
	height: 320px;
	width: 100%;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 640px;
		height: 228px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 736px;
	}
`;

export const CustomBgImage = styled(Image)`
	border-radius: 10px;
	object-fit: cover;
	object-position: center;
`;

export const ChangeImageLabel = styled.label`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 150px;
	padding: 14px 24px;
	height: 42px;
	font-size: 14px;
	font-weight: 600;
	line-height: 22px;
	background: ${BUTTON_DARK_BG};
	color: ${BUTTON_TEXT};
	cursor: pointer;
`;

export const SaveButton = styled(Button)`
	width: 101px;
	font-size: 14px;
	font-weight: 600;
	line-height: 22px;
`;

export default styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 700px;
		padding: 0px 30px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 802px;
	}
`;
