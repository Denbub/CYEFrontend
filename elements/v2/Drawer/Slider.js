import { useState } from "react";
import clsx from "clsx";

import SlideIcon from "icons/slide.svg";

const Slider = ({ title, style = "default", className, children }) => {
	const [openSlide, setOpenSlide] = useState(true);

	const toggleSliderHandler = () => {
		setOpenSlide(!openSlide);
	};

	return (
		<div className='block pt-[34px]'>
			<div
				className='flex cursor-pointer justify-between border-b-[1px] border-solid border-bg-subtle py-[6px] align-middle'
				onClick={toggleSliderHandler}
			>
				<h3
					className={clsx("typographyBodyRegular text-fg-default", {
						"typographySmallBold pl-[6px] !text-theme-accent-muted": style === "red"
					})}
				>
					{title}
				</h3>
				<div className='flex items-center justify-center'>
					<SlideIcon className={clsx(!openSlide && "origin-center rotate-180")} />
				</div>
			</div>
			<div
				className={clsx(
					openSlide ? "block" : "hidden",
					"transition-[top] duration-100",
					className
				)}
			>
				{children}
			</div>
		</div>
	);
};

export default Slider;
