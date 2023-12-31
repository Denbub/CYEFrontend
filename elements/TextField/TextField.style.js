import { INPUT_BORDER } from "colors";
import styled from "styled-components";

export const TextInput = styled.input`
	border: 1px solid ${INPUT_BORDER};
	font-family: var(--theme-font-copy);
	font-weight: 400;
	border-radius: 102px;
	max-width: 386px;
	font-size: 14px !important;
	height: auto !important;
	line-height: 22px;
	padding: 14px 21px !important;
	width: 100%;
	margin-bottom: 6px;
	&::placeholder {
		font-family: var(--theme-font-copy);
		font-size: 14px !important;
		font-weight: 400 !important;
		color: #e0e0e0;
	}
`;
