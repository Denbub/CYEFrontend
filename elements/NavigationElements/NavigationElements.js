import ArrowIcon from "icons/arrowRight.svg";

import { Next, Prev } from "./NavigationElements.style";

export const PrevButton = props => {
	return (
		<Prev {...props} ref={props.innerRef}>
			<ArrowIcon />
		</Prev>
	);
};

export const NextButton = props => {
	return (
		<Next {...props} ref={props.innerRef}>
			<ArrowIcon />
		</Next>
	);
};
