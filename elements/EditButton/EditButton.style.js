import styled from "styled-components";

import { WHITE } from "colors";
import { breakpoints } from "constant";

const EditButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${({ bgColor }) => bgColor || WHITE};
	height: 50px;
	width: 50px;
	flex-shrink: 0;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		height: 40px;
		width: 40px;
	}
`;

export default EditButton;
