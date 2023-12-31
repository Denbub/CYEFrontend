import clsx from "clsx";

const Input = props => {
	const { className = "", innerRef } = props;
	return (
		<input
			{...props}
			ref={innerRef}
			className={clsx(
				"typographyInputNormalRegular h-[40px] w-[316px] rounded-[9999px] border-2 border-accent-disabled py-[10px] px-[9px] pl-[24px] text-form-outline",
				"!box-border focus:border-form-outline focus:outline-none",
				className
			)}
		/>
	);
};

export default Input;
