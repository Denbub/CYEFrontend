import clsx from "clsx";

const Textarea = attributes => {
	const { className = "", defaultValue } = attributes;
	return (
		<textarea
			defaultValue={defaultValue}
			{...attributes}
			className={clsx(
				"typographyInputLargeRegular w-[316px] rounded-sm border-2 border-accent-disabled  py-[10px] px-[9px] pl-[24px] text-form-outline",
				"focus:border-form-outline focus:outline-none",
				className
			)}
		></textarea>
	);
};

export default Textarea;
