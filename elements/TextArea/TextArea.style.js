import styled from "styled-components";

import { INPUT_BORDER, WHITE } from "colors";

export const TextArea = styled.textarea`
	font-family: "Poppins";
	resize: none;
	width: 100%;
	min-height: 115px;
	padding: 14px 10px 14px 18px;
	background: ${WHITE};
	border: 1px solid ${INPUT_BORDER};
	border-radius: 20px;
	font-size: 14px;
	font-weight: 500;
	line-height: 22px;
`;

export default TextArea;
