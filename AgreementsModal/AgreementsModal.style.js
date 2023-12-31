import styled from "styled-components";

import { BUTTON_BG, BUTTON_DARK_BG, WHITE } from "colors";

export const Description = styled.p`
	font-size: 18px;
	font-weight: 400;
	line-height: 28px;
	text-align: center;
`;

export const ButtonsHolder = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	width: 100px;
	height: 42px;
	border-radius: 150px;
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 22px;
	color: ${WHITE};
`;

export const No = styled(Button)`
	background-color: ${BUTTON_DARK_BG};
`;

export const Yes = styled(Button)`
	background-color: ${BUTTON_BG};
`;

export const ContentHolder = styled.div`
	width: 215px;
`;

export default styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 22px 45px;
`;
