import { ACCENT, BLACK } from "colors";
import { directions } from "constant";
import styled, { css } from "styled-components";

const getNavigationStyles = ({ direction }) => {
	if (direction === directions.vertical) {
		return css`
			flex-direction: column;
			top: 50%;
			right: 0px;
			margin-top: -50px;
		`;
	}
	return css`
		width: 80px;
		justify-content: space-between;
		bottom: -45px;
		right: 50%;
		margin-right: -40px;
	`;
};

export const NavigationWrapper = styled.div`
	font-size: 34px;
	line-height: 50px;
	font-weight: 600;
	padding-bottom: 40px;
	position: absolute;

	z-index: 10;
	display: flex;
	${getNavigationStyles}
`;

export const Prev = styled.div`
	cursor: pointer;
	svg {
		fill: ${BLACK};
	}
	&:hover {
		svg {
			fill: ${ACCENT};
		}
	}
	${({ direction }) => (direction === directions.horizontal ? " transform: rotate(-90deg);" : "")}
`;
export const Next = styled(Prev)`
	${({ direction }) =>
		direction === directions.horizontal
			? " transform: rotate(90deg);"
			: "transform: rotate(180deg);"}
`;
