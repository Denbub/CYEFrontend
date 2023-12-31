import clsx from "clsx";

const Error = ({ error, className, style = "default" }) => {
	if (!error) {
		return null;
	}

	return (
		<div
			className={clsx("typographyCaptionRegular mt-[2px] text-error-emphasis", className, {
				"absolute bottom-[-20px] right-5 text-[14px] text-accent-default": style === "top"
			})}
		>
			{error}
		</div>
	);
};

export default Error;
