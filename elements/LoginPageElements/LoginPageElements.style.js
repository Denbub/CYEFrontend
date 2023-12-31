import Image from "next/image";
import styled from "styled-components";

import { breakpoints } from "constant";

export const LoginPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const BackgroundImage = styled(Image)`
	width: auto !important;
`;

export const Background = styled.div`
	display: none;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		display: block;
		width: 45%;
		position: absolute;
		top: -83px;
		bottom: 0;
		right: 0;
		overflow: hidden;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 50%;
	}
`;
