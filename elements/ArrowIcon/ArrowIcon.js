import styled from "styled-components";

const Svg = styled.svg`
	position: absolute;
	top: 24px;
	right: 22px;
`;

const ArrowIcon = ({ width = "12", height = "8" }) => {
	return (
		<Svg width={width} height={height} fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M11 1 6 6 1 1' stroke='#222' strokeWidth='2' />
		</Svg>
	);
};

export default ArrowIcon;
