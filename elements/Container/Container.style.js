import styled from "styled-components";

import { breakpoints } from "constant";

export default styled.div`
	margin: 0 auto;
	width: 100%;
	padding: 0px 10px;

	* > {
		font-family: "Poppins";
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 700px;
		padding: 0px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 1218px;
	}
`;
