import { NextButton, PrevButton } from "elements/NavigationElements";

import { NavigationHolder } from "./ServiceSwiperNavigation.style";

const ServiceSwiperNavigation = ({ prevRef, nextRef }) => {
	return (
		<NavigationHolder>
			<PrevButton innerRef={prevRef} />
			<NextButton innerRef={nextRef} />
		</NavigationHolder>
	);
};

export default ServiceSwiperNavigation;
