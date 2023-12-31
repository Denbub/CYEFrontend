import styled from "styled-components";

import { DIVIDER_COLOR, FOOTER_BG, FOOTER_DESCRIPTION_COLOR, WHITE } from "colors";
import { breakpoints } from "constant";

export const ContentHolder = styled.div`
	padding-bottom: 48px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding-bottom: 30px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		gap: 30px;
	}
`;

export const MainSection = styled.ul`
	display: flex;
	flex: 1;
	flex-wrap: wrap;
	justify-content: space-between;

	& > :not(:last-child) {
		margin-bottom: 30px;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		& > :not(:last-child) {
			margin-bottom: 0;
		}
	}
`;

export const FirstRow = styled.div`
	display: grid;
	grid-template-areas:
		"a c"
		"b b";

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 160px;
		grid-gap: 10px;
		grid-template-areas:
			"a"
			"b"
			"c";
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 282px;
	}
`;

export const LogoHolder = styled.div`
	grid-area: a;
`;

export const Description = styled.p`
	grid-area: b;
	font-size: 14px;
	line-height: 22px;
	padding-top: 30px;
	margin-bottom: 10px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		padding-top: 0px;
		margin-bottom: 0px;
	}
`;

export const SocialMediaList = styled.ul`
	grid-area: c;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 20px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		justify-content: flex-start;
	}
`;

export const Title = styled.h3`
	font-size: 20px;
	line-height: 28px;
	color: ${WHITE};
	font-weight: 600;
	margin-bottom: 5px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin-bottom: 18px;
	}
`;

export const FooterMenuLinks = styled.ul`
	font-size: 16px;
	line-height: 40px;

	& > li > a {
		color: ${FOOTER_DESCRIPTION_COLOR};
	}

	& > li:hover {
		text-decoration: underline;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		font-size: 14px;
		font-weight: 400;
		line-height: 30px;
	}
`;

export const CopyrightSection = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column-reverse;
	gap: 13px;
	padding-top: 32px;

	&::before {
		position: absolute;
		top: 0;
		content: "";
		height: 1px;
		width: 100%;
		background-color: ${DIVIDER_COLOR};
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		padding-top: 24px;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}
`;

export const Copyright = styled.p`
	font-size: 14px;
	line-height: 22px;
	margin: 0;
`;

export const IconsHolder = styled.ul`
	display: flex;
	justify-content: center;
	gap: 8px;
`;

export default styled.footer`
	background-color: ${FOOTER_BG};
	color: ${FOOTER_DESCRIPTION_COLOR};
	padding: 60px 10px 30px;
`;
