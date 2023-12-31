import ImageBase from "next/image";
import styled, { css } from "styled-components";

import { ACCENT, BLACK, TEXT_GREY } from "colors";
import { breakpoints } from "constant";
import { getFontSize, getFontWeight, getTextAlight } from "styleHelpers";

import DynamicTitle from "elements/DynamicTitle";

const SIZE = "718px";

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

export const Description = styled.p`
	font-size: 18px;
	font-weight: 400;
	line-height: 28px;
	letter-spacing: 0em;
	text-align: center;
	margin-bottom: 20px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		text-align: left;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-bottom: 40px;
	}

	${getDynamicStyles};
`;

export const SignRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		justify-content: normal;
		margin-bottom: 72px;
	}
`;

export const NameHolder = styled.div`
	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-right: 45px;
	}
`;

export const Position = styled.p`
	color: ${TEXT_GREY};
	font-size: 14px;
	font-weight: 700;
	line-height: 22px;
	text-transform: uppercase;
`;

export const Name = styled.p`
	font-size: 18px;
	font-weight: 700;
	line-height: 28px;
	letter-spacing: 0em;
	color: ${BLACK};
`;

export const IconsHolder = styled.div`
	display: grid;
	align-items: center;
	justify-content: center;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
	margin-bottom: 50px;

	& > img {
		max-width: 100%;
		margin: 0 auto;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 30px;
		margin-bottom: 0;
	}
`;

export const Column = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

export const BackgroundRectangle = styled.div`
	position: absolute;
	bottom: 0;
	right: 50%;
	transform: translateX(50%);
	height: 400px;
	width: calc(100% + 20px);
	background-color: ${ACCENT};

	@media screen and (min-width: ${breakpoints.TABLET}) {
		right: calc(${SIZE} / 2);
		bottom: 50%;
		transform: translateY(50%);
		height: ${SIZE};
		width: 2000px;
	}
`;

export const BackgroundCircle = styled.div`
	z-index: 2;
	position: absolute;
	top: 0;
	right: 50%;
	transform: translateX(50%);
	min-height: 360px;
	height: auto;
	width: calc(100% + 20px);
	border-radius: 50%;
	background-color: ${ACCENT};

	@media screen and (min-width: ${breakpoints.TABLET}) {
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: ${SIZE};
		width: ${SIZE};
	}
`;

export const StyledImage = styled(ImageBase)`
	width: 360px;
	height: 575px;
	margin: 0 auto;
	position: relative;
	z-index: 3;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		position: absolute;
		bottom: 0;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 545px;
		height: 867px;
	}
`;

export default styled.section`
	display: flex;
	flex-direction: column-reverse;
	min-height: 575px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 718px;
		align-items: center;
		grid-gap: 100px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		min-height: 867px;
	}
`;
