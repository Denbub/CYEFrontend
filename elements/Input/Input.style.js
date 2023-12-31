import styled from "styled-components";

import { INPUT_BORDER, WHITE } from "colors";

export default styled.input`
	font-family: "Poppins";
	padding: 14px 10px 14px 18px;
	background: ${WHITE};
	width: 100%;
	height: 50px;
	border: 1px solid ${INPUT_BORDER};
	border-radius: 100px;
	font-size: 14px;
	font-weight: 400;
	line-height: 22px;
	box-sizing: border-box !important;
`;
