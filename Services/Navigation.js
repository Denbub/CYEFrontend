import { useSwiper } from "swiper/react";
import { NavigationWrapper, Next, Prev } from "./Navigation.styles";

import ArrowIcon from "icons/arrowUp.svg";

const Navigation = ({ direction }) => {
	const swiper = useSwiper();

	return (
		<NavigationWrapper direction={direction}>
			<Prev onClick={() => swiper.slidePrev()} direction={direction}>
				<ArrowIcon />
			</Prev>
			<Next onClick={() => swiper.slideNext()} direction={direction}>
				<ArrowIcon />
			</Next>
		</NavigationWrapper>
	);
};

export default Navigation;
