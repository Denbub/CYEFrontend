import styled from "styled-components";
export const BurgerWrapper = styled.button`
	display: block;
	position: relative;
	width: 36px;
	height: 36px;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 0;
	z-index: 10;
	overflow: hidden;
	background: black;
	border-radius: 50%;

	&:focus {
		outline: none;
	}

	div {
		position: absolute;
		width: 12px;
		height: 2px;
		background: white;
		transition: all 0.3s linear;
		top: 50%;
		left: 50%;
		margin-left: -6px;

		:first-child {
			margin-top: ${({ open }) => (open ? "-1px" : "-5px")};
			margin-left: ${({ open }) => (open ? "-7px" : "-6px")};
			width: ${({ open }) => (open ? "15px" : "12px")};
			transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0) ")};
		}

		:nth-child(2) {
			margin-top: ${({ open }) => (open ? "-1px" : "-1px")};
			opacity: ${({ open }) => (open ? "0" : "1")};
			transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
			width: ${({ open }) => (open ? "12px" : "12px")};
		}

		:nth-child(3) {
			margin-top: ${({ open }) => (open ? "-1px" : "3px")};
			margin-left: ${({ open }) => (open ? "-7px" : "-6px")};
			width: ${({ open }) => (open ? "15px" : "12px")};
			transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
		}
	}
`;
