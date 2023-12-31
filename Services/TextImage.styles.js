import NextImage from "next/image";
import NextLink from "next/link";
import styled, { css } from "styled-components";

import { ACCENT, BLACK, WHITE } from "colors";
import { breakpoints } from "constant";
import { getFontSize, getFontWeight, getTextAlight } from "styleHelpers";

import DynamicTitle from "elements/DynamicTitle";

export const ContentHolder = styled.div`
	display: grid;
	grid-gap: 56px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-template-columns: ${({ oneChild }) => (oneChild ? "1fr" : "1fr 1fr")};
		align-items: center;
	}
`;

const getDynamicStyles = ({ fontSize, textAlign, fontWeight }) => {
	return css`
		font-size: ${getFontSize(fontSize)};
		text-align: ${getTextAlight(textAlign)};
		font-weight: ${getFontWeight(fontWeight)};
	`;
};

export const Title = styled(DynamicTitle)`
	margin-bottom: 30px;
	text-align: center;
`;

export const TextBlockHolder = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Text = styled.p`
	line-height: 28px;
	white-space: pre-line;
	color: ${BLACK};
	margin-bottom: 40px;
	${getDynamicStyles};
`;

export const Image = styled(NextImage)`
	border-radius: 20px;
	max-width: 100%;
	width: ${({ imagewidth }) => (imagewidth ? `${imagewidth}%` : "auto")};
	height: auto;
	margin: 0 auto;
`;

const linkStyles = css`
	background-color: ${ACCENT};
	padding: 14px 24px;
	min-height: 50px;
	color: ${WHITE};
	border-radius: 150px;
	font-size: 14px;
	font-weight: 600;
	line-height: 22px;
	letter-spacing: 0em;
	text-align: center;
`;

export const LinkHolder = styled.div`
	display: flex;
	justify-content: center;
`;

export const ExternalLink = styled.a`
	${linkStyles}
`;

export const Link = styled(NextLink)`
	${linkStyles}
`;
