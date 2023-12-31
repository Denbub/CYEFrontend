import clsx from "clsx";

const CommonLink = ({ className, href, target, children }) => (
	<a
		href={href}
		target={target}
		className={clsx(
			"typographyButtonLargeRegular flex h-[40px] items-center text-white",
			"justify-center rounded-[150px] px-[16px] text-center",
			"transition-[color] duration-[0.2s] ease-linear hover:text-black",
			"bg-grey-950 hover:text-white",
			className
		)}
	>
		{children}
	</a>
);

export default CommonLink;
