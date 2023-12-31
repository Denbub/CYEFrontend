import styled from "styled-components";

import { breakpoints } from "constant";

export default styled.div`
	display: grid;
	grid-gap: 50px;
	grid-auto-columns: 100%;
	margin-bottom: 40px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-gap: 60px;
		margin-bottom: 70px;
	}
	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		grid-gap: 80px;
		margin-bottom: 90px;
	}
`;
