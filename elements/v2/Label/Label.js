import clsx from "clsx";

const Label = ({ className, label, required, id, ...rest }) => {
	if (!label) {
		return null;
	}
	return (
		<label
			htmlFor={id}
			className={clsx("typographySmallBold mb-[4px] block ", className)}
			{...rest}
		>
			{label}
			{required && <span className='bold ml-[4px] text-accent-default'>*</span>}
		</label>
	);
};

export default Label;
