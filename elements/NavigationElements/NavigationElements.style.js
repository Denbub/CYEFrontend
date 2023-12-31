import styled from "styled-components";

import { ACCENT, ARROW_DISABLED, BLACK } from "colors";
import { breakpoints } from "constant";

export const Next = styled.button`
	background-color: transparent;
	width: 22px;
	height: 16px;
	user-select: none;
	> svg {
		fill: ${BLACK};
		width: 30px;
		height: 25px;
	}

	&:hover {
		> svg {
			fill: ${ACCENT};
		}
	}

	&:disabled {
		pointer-events: none;
		cursor: not-allowed;

		> svg {
			fill: ${ARROW_DISABLED};
		}

		&:hover {
			> svg {
				fill: ${ARROW_DISABLED};
			}
		}
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		> svg {
			width: 23px;
			height: 17px;
		}
	}
`;

export const Prev = styled(Next)`
	transform: rotateZ(180deg);
`;
