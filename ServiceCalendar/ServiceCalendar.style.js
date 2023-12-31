import Button from "elements/Button";
import styled, { css } from "styled-components";

import { ACCENT, BUTTON_DISABLED_BG, GRAY_BUTTON_BG, PERIOD_BUTTON_BG, TEXT_GREY } from "colors";
import { breakpoints } from "constant";

export const Wrapper = styled.div`
	@media screen and (min-width: ${breakpoints.TABLET}) {
		padding: 0 40px;
	}
`;

export const ContentHolder = styled.div`
	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		display: flex;
		gap: 14px;
	}
`;

export const Title = styled.h3`
	font-size: 20px;
	font-weight: 600;
	line-height: 28px;
	letter-spacing: 0;
	text-align: left;
`;

export const CalendarHolder = styled.div`
	margin-bottom: 15px;
`;

export const Row = styled.div`
	display: grid;
	justify-content: space-between;
	grid-template-rows: 62px 1fr;
	grid-template-areas:
		"addButton saveButton"
		"periods periods";

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		grid-template-rows: 62px 1fr 42px;
		grid-template-areas:
			"addButton addButton"
			"periods periods"
			"saveButton saveButton";
	}
`;

export const ErrorMessage = styled.p`
	grid-area: errorMessage;
	color: ${ACCENT};
	font-size: 14px;
	font-weight: 400;
	line-height: 19px;
	letter-spacing: 0;
	text-indent: 30px;
	position: relative;

	::before {
		content: "!";
		position: absolute;
		left: 0;
		top: -3px;
		display: block;
		border-radius: 50%;
		color: inherit;
		line-height: 24px;
		text-align: center;
		width: 24px;
		height: 24px;
		text-indent: 0px;
		background-color: ${GRAY_BUTTON_BG};
	}
`;

export const Periods = styled.div`
	grid-area: periods;
`;

export const PeriodsHolder = styled.div`
	max-height: 156px;
	overflow-y: auto;

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		max-height: 400px;
	}
`;

export const Period = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: Poppins;
	font-size: 14px;
	font-weight: 400;
	line-height: 19px;
	letter-spacing: 0;
	margin: 10px;
`;

export const PeriodName = styled.span``;

export const PeriodRange = styled.p``;

export const PeriodButtonsHolder = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
`;

const commonPeriodButtonStyles = css`
	width: 35px;
	height: 35px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${PERIOD_BUTTON_BG};

	& > svg {
		fill: ${TEXT_GREY};
	}
`;

export const EditButton = styled.button`
	${commonPeriodButtonStyles};
`;

export const DeleteButton = styled.button`
	${commonPeriodButtonStyles};
`;

const commonButtonStyles = css`
	font-size: 14px;
	font-weight: 600;
	line-height: 22px;
	letter-spacing: 0;
	height: 42px;
	text-align: center;

	&[disabled] {
		background-color: ${BUTTON_DISABLED_BG};
		cursor: not-allowed;
	}
`;

export const AddButton = styled(Button)`
	width: 161px;
	gap: 14px;
	grid-area: addButton;
	${commonButtonStyles};
`;

export const SaveButton = styled(Button)`
	width: 101px;
	grid-area: saveButton;
	${commonButtonStyles};
`;
