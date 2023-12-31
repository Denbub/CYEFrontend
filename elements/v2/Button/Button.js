import clsx from "clsx";
import { useTranslation } from "next-i18next";

import Arrow from "icons/arrow.svg";

const Button = ({
	text,
	hasArrowLeft,
	hasArrowRight,
	onClick,
	type = "button",
	color = "default",
	size = "default",
	width = "default",
	className,
	children,
	disabled
}) => {
	const { t } = useTranslation();

	const buttonClass = clsx(
		className,
		"flex items-center justify-center rounded-full py-[6px] text-fg-on-accent gap-[12px]",
		"xl:py-[14px]",
		{
			"bg-accent-default": color === "default",
			"bg-grey-950": color === "grey",
			"bg-black text-white": color === "black",
			"bg-grey-950 text-white disabled:bg-accent-disabled disabled:text-fg-on-disabled":
				color === "grey",
			"bg-transparent !text-fg-default": color === "transparent",
			"bg-transparent !text-error-emphasis": color === "transparent-red",
			"bg-black/40 text-white/40": color === "black" && disabled,
			"bg-orange-500": color === "orange-500",
			"xl:typographyButtonXLargeBold": size === "default",
			typographyButtonLargeBold: size === "default",
			typographyButtonLargeRegular: size === "regular",
			"min-w-[316px] h-[40px] rounded-[9999px] !py-sm !px-[16px] duration-200 ":
				size === "small",
			"w-full": width === "default",
			"w-auto": width === "auto"
		}
	);

	return (
		<button type={type} onClick={onClick} className={buttonClass} disabled={disabled}>
			{hasArrowLeft && <Arrow className=' h-lg w-lg -rotate-180 transform' />}
			{children}
			{t(text)}
			{hasArrowRight && <Arrow className=' h-lg w-lg' />}
		</button>
	);
};

export default Button;
