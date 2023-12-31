import clsx from "clsx";
import { useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperNavigation from "components/v2/SwiperNavigation";

import "swiper/css";

const Carousel = ({
	renderComponent: RenderComponent,
	renderComponentProps,
	items,
	slidesPerView,
	spaceBetween,
	breakpoints,
	arrowMobile,
	pagination = false,
	horizontalClass,
	arrowsConfig = {
		size: "default",
		opacity: false,
		inset: "outer",
		arrowCenter: false
	}
}) => {
	const [swiper, setSwiper] = useState(null);
	if (!items.length) {
		return null;
	}

	return (
		<div>
			<Swiper
				horizontalClass={horizontalClass}
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				onSwiper={swiper => setSwiper(swiper)}
				breakpoints={breakpoints}
				pagination={pagination}
				modules={[Pagination]}
			>
				{items.map((item, index) => (
					<SwiperSlide key={index}>
						<RenderComponent
							item={item}
							carousel
							{...renderComponentProps}
							index={index}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<div
				className={clsx(
					swiper && (swiper.allowSlideNext || swiper.allowSlidePrev) ? "block" : "hidden",
					!arrowsConfig.arrowCenter &&
						(arrowMobile
							? `top-[50%] xl:top-[4px] xl:right-0 xl:left-auto xl:w-auto `
							: "top-[4px] right-0 "),
					arrowMobile && arrowsConfig.inset === "outer" && `inset-x-[-15px]`,
					arrowMobile && arrowsConfig.inset === "inner" && `inset-x-[16px]`,
					arrowsConfig.arrowCenter && `top-[50%]`,
					"absolute z-10"
				)}
			>
				<SwiperNavigation
					arrowsConfig={arrowsConfig}
					swiper={swiper}
					className={clsx(arrowMobile && "justify-between")}
					carousel
				/>
			</div>
		</div>
	);
};

export default Carousel;
