import clsx from "clsx";
import ArrowIcon from "icons/arrowLeft.svg";
import ArrowLargeIcon from "icons/arrowLeftLarge.svg";

export const PrevButton = ({ arrowsConfig, ...props }) => {
	const { size, opacity } = arrowsConfig;
	return (
		<button
			{...props}
			className={clsx(
				"flex items-center justify-center rounded-[100px]",
				size === "large" ? "h-[40px] w-[40px] scale-100" : "h-[32px] w-[32px]",
				opacity ? "bg-fg-on-accent/80" : "bg-fg-on-accent",
				props.carousel ? "shadow-default" : " shadow-shadow-theme-20 "
			)}
		>
			{size === "large" ? <ArrowLargeIcon /> : <ArrowIcon />}
		</button>
	);
};

export const NextButton = ({ arrowsConfig, ...props }) => {
	const { size, opacity } = arrowsConfig;
	return (
		<button
			{...props}
			className={clsx(
				"flex items-center justify-center rounded-[100px]",
				size === "large" ? "h-[40px] w-[40px] scale-100" : "h-[32px] w-[32px]",
				opacity ? "bg-fg-on-accent/80" : "bg-fg-on-accent",
				props.carousel ? "shadow-default" : " shadow-shadow-theme-20 "
			)}
		>
			{size === "large" ? (
				<ArrowLargeIcon className='rotate-180' />
			) : (
				<ArrowIcon className='rotate-180' />
			)}
		</button>
	);
};
