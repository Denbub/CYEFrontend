import styled, { css } from "styled-components";

import {
	ACCENT,
	BLACK,
	CALENDAR_CELL_BG,
	CALENDAR_CELL_EMPTY_BG,
	CALENDAR_PAST_DAYS,
	WHITE
} from "colors";
import { breakpoints } from "constant";
import { transparentize } from "styleHelpers";

export const CaptionHolder = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
`;

export const CaptionLabel = styled.h3`
	font-size: 16px;
	font-weight: 400;
	line-height: 28px;
	color: ${BLACK};
`;

export const BookedDay = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

export const BookedLabel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 7px;
	line-height: 1;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		font-size: 14px;
		font-weight: 400;
		gap: 4px;
		padding: 0px 8px 8px 0px;
	}
`;

const rangeControlStyles = css`
	position: absolute;
	z-index: 2;
	top: 50%;
	transform: translateY(-50%);
	content: "";
	display: block;
	border-radius: 50%;
	height: 13px;
	width: 13px;
	background: center / contain no-repeat url("/icons/pick.svg");

	@media screen and (min-width: ${breakpoints.TABLET}) {
		height: 16px;
		width: 16px;
	}
`;

//TODO: remove day picker styles from dist in node modules

export default styled.div`
	.rdp {
		--rdp-cell-size: 44px;
		--rdp-accent-color: ${transparentize(ACCENT, 0.06)};
		--rdp-background-color: var(--rdp-accent-color);
		--rdp-accent-color-dark: #3003e1;
		--rdp-background-color-dark: #180270;
		--rdp-outline: 2px solid var(--rdp-accent-color); /* Outline border for focused elements */
		--rdp-outline-selected: 3px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */

		@media screen and (min-width: ${breakpoints.TABLET}) {
			--rdp-cell-size: 88px;
		}

		@media screen and (min-width: ${breakpoints.DESKTOP}) {
			--rdp-cell-size: 111px;
		}
	}

	/* Hide elements for devices that are not screen readers */
	.rdp-vhidden {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		background: transparent;
		border: 0;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		position: absolute !important;
		top: 0;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		overflow: hidden !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		border: 0 !important;
	}

	/* Buttons */
	.rdp-button_reset {
		appearance: none;
		position: relative;
		margin: 0;
		padding: 0;
		cursor: default;
		color: inherit;
		background: none;
		font: inherit;

		-moz-appearance: none;
		-webkit-appearance: none;
	}

	.rdp-button_reset:focus-visible {
		/* Make sure to reset outline only when :focus-visible is supported */
		outline: none;
	}

	.rdp-button {
		border: 2px solid transparent;
	}

	.rdp-button[disabled] {
		background-color: ${CALENDAR_PAST_DAYS};
	}

	.rdp-button:not([disabled]) {
		cursor: pointer;
	}

	.rdp-button:focus-visible:not([disabled]) {
		color: inherit;
		background-color: var(--rdp-background-color);
		border: var(--rdp-outline);
	}

	.rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
		background-color: var(--rdp-background-color);
	}

	.rdp-months {
		display: flex;
		justify-content: center;
	}

	.rdp-month {
		margin: 0 1em;
	}

	.rdp-month:first-child {
		margin-left: 0;
	}

	.rdp-month:last-child {
		margin-right: 0;
	}

	.rdp-table {
		margin: 0;
		max-width: calc(var(--rdp-cell-size) * 7);
		border-collapse: collapse;
	}

	.rdp-with_weeknumber .rdp-table {
		max-width: calc(var(--rdp-cell-size) * 8);
		border-collapse: collapse;
	}

	.rdp-caption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0;
		text-align: left;
	}

	.rdp-multiple_months .rdp-caption {
		position: relative;
		display: block;
		text-align: center;
	}

	.rdp-caption_dropdowns {
		position: relative;
		display: inline-flex;
	}

	.rdp-caption_label {
		padding: 0 0.25em;
		font-family: Poppins;
		font-size: 16px;
		font-weight: 400;
		line-height: 28px;
	}

	.rdp-nav {
		white-space: nowrap;
	}

	.rdp-multiple_months .rdp-caption_start .rdp-nav {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.rdp-multiple_months .rdp-caption_end .rdp-nav {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}

	.rdp-nav_button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--rdp-cell-size);
		height: var(--rdp-cell-size);
		padding: 0.25em;
		border-radius: 100%;
	}

	.rdp-head {
		border: 0;
	}

	.rdp-head_row,
	.rdp-row {
		height: 100%;
	}

	.rdp-head_cell {
		vertical-align: middle;
		text-transform: capitalize;
		font-family: Poppins;
		font-size: 12px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0;
		text-align: right;
		padding: 0;

		@media screen and (min-width: ${breakpoints.TABLET}) {
			font-size: 14px;
			text-align: left;
		}
	}

	.rdp-tbody {
		border: 0;
	}

	.rdp-tfoot {
		margin: 0.5em;
	}

	.rdp-cell {
		position: relative;
		width: var(--rdp-cell-size);
		height: 100%;
		height: var(--rdp-cell-size);
		padding: 0;
		background-color: ${CALENDAR_CELL_EMPTY_BG};
		border: 1px solid ${WHITE};
	}

	.rdp-weeknumber {
		font-size: 0.75em;
	}

	.rdp-weeknumber,
	.rdp-day {
		display: flex;
		padding: 3px;
		font-family: Poppins;
		font-size: 12px;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0;
		text-align: left;
		width: var(--rdp-cell-size);
		max-width: var(--rdp-cell-size);
		height: var(--rdp-cell-size);
		margin: 0;
		background-color: ${CALENDAR_CELL_BG};

		@media screen and (min-width: ${breakpoints.TABLET}) {
			font-size: 14px;
			font-weight: 400;
		}
	}

	.rdp-day_selected:not([disabled]),
	.rdp-day_selected:focus-visible:not([disabled]),
	.rdp-day_selected:hover:not([disabled]) {
		background-color: var(--rdp-accent-color);
	}

	.rdp-day_outside {
		opacity: 0.5;
	}

	.rdp-day_selected:focus-visible {
		/* Since the background is the same use again the outline */
		outline: var(--rdp-outline);
		outline-offset: 2px;
		z-index: 1;
	}

	//first in range
	.rdp-day_range_start:not(.rdp-day_range_end):not([disabled]) {
		box-shadow: 0 1px 0 ${ACCENT}, -1px -1px 0 ${ACCENT}, -1px 1px 0 ${ACCENT};

		::before {
			${rangeControlStyles};
			left: -9px;
			@media screen and (min-width: ${breakpoints.TABLET}) {
				left: -10px;
			}
		}
	}
	//last in range
	.rdp-day_range_end:not(.rdp-day_range_start):not([disabled]) {
		box-shadow: 0 1px 0 ${ACCENT}, 1px -1px 0 ${ACCENT}, 1px 1px 0 ${ACCENT};
		::before {
			${rangeControlStyles};
			right: -9px;
			@media screen and (min-width: ${breakpoints.TABLET}) {
				right: -10px;
			}
		}
	}
	//only one day in range
	.rdp-day_range_end:not([disabled]).rdp-day_range_start:not([disabled]) {
		box-shadow: 0 0 0 1px ${ACCENT};
		::before {
			${rangeControlStyles};
			right: -9px;
			@media screen and (min-width: ${breakpoints.TABLET}) {
				right: -10px;
			}
		}

		::after {
			${rangeControlStyles};
			left: -9px;
			@media screen and (min-width: ${breakpoints.TABLET}) {
				left: -10px;
			}
		}
	}

	.rdp-day_range_middle:not([disabled]) {
		box-shadow: 0 1px 0 ${ACCENT}, 0 -1px 0 ${ACCENT};
	}
`;
