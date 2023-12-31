import styled from "styled-components";

import { ACCENT, WHITE } from "colors";
import { breakpoints } from "constant";

import ContainerBase from "elements/v2/Container";

export const Text = styled.p`
	font-family: Poppins;
	font-size: 18px;
	font-weight: 500;
	line-height: 28px;
	letter-spacing: 0em;
	text-align: center;
	margin: 0 auto 30px;
	max-width: 823px;
`;

export const Button = styled.button`
	display: block;
	text-align: center;
	background-color: ${ACCENT};
	padding: 14px 28px;
	width: 156px;
	height: 50px;
	border-radius: 150px;
	margin: 0 auto;
	font-family: Poppins;
	font-size: 14px;
	font-weight: 600;
	line-height: 22px;
	letter-spacing: 0em;
	color: ${WHITE};
`;

export const Container = styled(ContainerBase)`
	padding: 60px 0px;
`;

export default styled.div`
	height: 200px;
	max-height: calc(100vh - 160px);
	background-image: url("/icons/404.svg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
	margin-bottom: 25px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		height: 326px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		height: 564px;
	}
`;
