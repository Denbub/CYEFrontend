import NextImage from "next/image";
import styled from "styled-components";

import { BUTTON_DARK_BG, BUTTON_TEXT, DEFAULT_PHOTO_BG, GRAY_BUTTON_BG, WHITE } from "colors";
import { breakpoints } from "constant";

import Button from "elements/Button";

export const Image = styled(NextImage)`
	border-radius: 20px;
	object-fit: cover;
	object-position: center;
`;

export const ControlButton = styled.button`
	position: absolute;
	bottom: 20px;
	right: 20px;
	height: 34px;
	width: 34px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${WHITE};
	cursor: pointer;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		bottom: 10px;
		right: 10px;
		height: 42px;
		width: 42px;
	}
`;

export const GalleryItem = styled.li`
	position: relative;
	border-radius: 20px;
	background: ${DEFAULT_PHOTO_BG};
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const DeleteModalContentHolder = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 0 35px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 475px;
		padding: 30px 92px;
	}
`;

export const IconHolder = styled.div`
	width: 50px;
	height: 50px;
	margin-bottom: 20px;
`;

export const DeleteModalText = styled.p`
	font-size: 20px;
	font-weight: 600;
	line-height: 28px;
	text-align: center;
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		font-size: 18px;
		font-weight: 400;
		line-height: 28px;
	}
`;

export const DeleteButton = styled(Button)`
	width: 101px;
	height: 42px;
`;

export const AddModalContentHolder = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > input {
		display: none;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 580px;
		padding: 10px 40px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 802px;
	}
`;

export const AddModalTitle = styled.h4`
	font-size: 20px;
	font-weight: 600;
	line-height: 28px;
	align-self: flex-start;
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		font-size: 18px;
		font-weight: 400;
		line-height: 28px;
		margin-bottom: 40px;
	}
`;

export const PhotoIconHolder = styled.label`
	width: 226px;
	height: 226px;
	border-radius: 50%;
	background-color: ${GRAY_BUTTON_BG};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 153px;
		height: 153px;
		margin-bottom: 14px;
	}
`;

export const AddPhotoLabel = styled.label`
	display: block;
	font-size: 14px;
	font-weight: 500;
	line-height: 22px;
	width: 100%;
	text-align: center;
	cursor: pointer;
`;

export const ButtonsHolder = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 13px;
	height: 42px;
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

export default styled.ul`
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(4, 146px);
	margin-bottom: 50px;

	& > :first-child {
		grid-column: 1 / span 2;
		grid-row: 1 / span 2;
	}

	& > :nth-child(even) {
		grid-row: 3 / span 1;
	}

	& > :not(:first-child):nth-child(odd) {
		grid-row: 4 / span 1;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(2, 145px);
		grid-gap: 20px;
		margin-bottom: 49px;

		& > :first-child {
			grid-column: 1 / span 4;
			grid-row: 1 / span 2;
		}

		& > :nth-child(even) {
			grid-column: 5 / span 2;
			grid-row: auto;
		}

		& > :not(:first-child):nth-child(odd) {
			grid-column: 7 / span 2;
			grid-row: auto;
		}
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		grid-template-rows: repeat(2, 256px);
		margin-bottom: 94px;
	}
`;
