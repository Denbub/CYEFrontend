import clsx from "clsx";

import CheckedIcon from "icons/checked.svg";

const TextCell = ({ className, children }) => {
	return (
		<div
			className={clsx(
				"typographySmallRegular  flex items-center justify-between text-right text-fg-default",
				"max-w-[550px]",
				className
			)}
		>
			<span className='max-w-[500px] line-clamp-1'>{children}</span>
			{!!children && <CheckedIcon />}
		</div>
	);
};

export default TextCell;
