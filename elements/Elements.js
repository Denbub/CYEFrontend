import styled from "styled-components";

import { breakpoints } from "constant";

export const MainWrapper = styled.main`
	flex: 1 0 auto;
	padding-top: 83px;
	min-height: calc(100vh - 186px);
	position: relative;
`;

export const Column = styled.div`
	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 50%;
	}
`;
