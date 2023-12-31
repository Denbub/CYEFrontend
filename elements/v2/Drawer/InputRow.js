import clsx from "clsx";

const InputRow = ({ className = "", children }) => {
	return (
		<div className={clsx("relative flex justify-between pt-[24px]", className)}>{children}</div>
	);
};

export default InputRow;
