import clsx from "clsx";
import { NextButton, PrevButton } from "elements/v2/NavigationElements";

const SwiperNavigation = ({ swiper, className, carousel = false, arrowsConfig = {} }) => {
	const onPrevButtonClick = () => {
		swiper?.slidePrev();
	};

	const onNextButtonClick = () => {
		swiper?.slideNext();
	};

	return (
		<div className={clsx("flex gap-sm", className)}>
			<PrevButton
				onClick={onPrevButtonClick}
				carousel={carousel}
				arrowsConfig={arrowsConfig}
			/>
			<NextButton
				onClick={onNextButtonClick}
				carousel={carousel}
				arrowsConfig={arrowsConfig}
			/>
		</div>
	);
};

export default SwiperNavigation;
