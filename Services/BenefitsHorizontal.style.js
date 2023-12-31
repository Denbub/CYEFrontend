import { ACCENT, BLACK, BORDER, TEXT_GREY, WHITE } from "colors";
import Image from "next/image";
import LinkBase from "next/link";
import styled, { css } from "styled-components";

import { breakpoints } from "constant";
import { transparentize } from "styleHelpers";

export const Row = styled.div`
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		display: grid;
		align-items: center;
		grid-template-columns: 40% 1fr;
		margin-bottom: 60px;
		grid-gap: 20px;
	}
`;

export const Title = styled.h2`
	font-size: 24px;
	font-weight: 600;
	line-height: 32px;
	letter-spacing: 0em;
	text-align: center;
	color: ${BLACK};
	margin-bottom: 10px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin-bottom: 0;
		text-align: left;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		font-size: 44px;
		font-weight: 700;
		line-height: 55px;
	}
`;

export const Description = styled.p`
	font-size: 16px;
	font-weight: 500;
	line-height: 26px;
	text-align: center;
	letter-spacing: 0em;
	color: ${TEXT_GREY};

	@media screen and (min-width: ${breakpoints.TABLET}) {
		text-align: left;
		font-size: 14px;
		line-height: 22px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		font-size: 16px;
		line-height: 26px;
	}
`;

export const List = styled.ul`
	display: grid;
	align-items: center;
	grid-template-columns: repeat(4, 1fr);
	margin-bottom: 60px;
	grid-gap: 30px;
	margin-bottom: 30px;
`;

export const ListItem = styled.li`
	position: relative;
	width: 100%;
	height: 236px;
	border: 1px solid ${BORDER};
	border-radius: 10px;
	padding: 40px 30px 20px;
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin: 0;
		height: 152px;
		padding: 20px 14px 10px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		height: 236px;
		padding: 40px 30px 20px;
	}

	&::before {
		content: "";
		position: absolute;
		width: 4px;
		height: 54px;
		border-radius: 20px;
		background-color: ${ACCENT};
		left: 0px;
		top: 38px;
		box-shadow: 0px 14px 24px ${transparentize(BLACK, 0.03)};

		@media screen and (min-width: ${breakpoints.TABLET}) {
			top: 19px;
			width: 3px;
			height: 33px;
		}

		@media screen and (min-width: ${breakpoints.LAPTOP}) {
			top: 38px;
			width: 4px;
			height: 45px;
		}
	}
`;

export const IconHolder = styled.div`
	margin-bottom: 30px;
`;

export const ItemDescription = styled.p`
	font-size: 18px;
	font-weight: 500;
	line-height: 28px;
	letter-spacing: 0em;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		font-size: 16px;
		line-height: 24px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		font-size: 18px;
		line-height: 28px;
	}
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
	${linkStyles};
`;

export const Link = styled(LinkBase)`
	${linkStyles};
`;

export const SwiperHolder = styled.div`
	margin: 0 auto;
	width: 340px;
	margin-bottom: 40px;
`;

export const NavigationHolder = styled.div`
	margin: 0 auto;
	display: flex;
	align-items: center;
	gap: 20px;
	width: 80px;
`;

export const StyledImage = styled(Image)`
	max-width: 42px;
	max-height: 42px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		max-width: 30px;
		max-height: 30px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		max-width: 46px;
		max-height: 46px;
	}
`;
