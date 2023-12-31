import styled from "styled-components";

import { breakpoints } from "constant";

import ButtonBase from "elements/Button";
import InputBase from "elements/Input";
import TextAreaBase from "elements/TextArea";

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		padding: 0px 30px;
		width: 690px;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 594px;
	}
`;

export const Input = styled(InputBase)`
	margin-bottom: 26px;
`;

export const TextArea = styled(TextAreaBase)`
	min-height: 215px;
`;

export const Button = styled(ButtonBase)`
	margin-top: 20px;
	font-size: 14px;
`;

export default styled.div`
	margin-bottom: 50px;
`;
