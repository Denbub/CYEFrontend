import clsx from "clsx";

import Error from "elements/v2/Error";
import Label from "elements/v2/Label";

const Input = ({
	children,
	className,
	icon,
	onInputFocus,
	disabled,
	label,
	required,
	id,
	error,
	innerRef,
	...props
}) => {
	return (
		<div>
			<Label label={label} required={required} id={id} />
			<div className='flex'>
				{icon &&
					icon({
						className: clsx(
							onInputFocus
								? "fill-black"
								: disabled
								? "fill-input-disabled"
								: "fill-input-placeholder",
							"relative top-sm left-[20px]"
						)
					})}
				<input
					className={clsx(
						icon ? "pl-lg " : "pl-md",
						"input-normal-regular !box-border  border-solid py-sm pr-md placeholder:input-normal-regular focus:outline-none",
						className,
						disabled
							? "placeholder:text-input-disabled"
							: "placeholder:text-input-placeholder",
						error ? " border-error-emphasis" : "border-border-default"
					)}
					disabled={disabled}
					ref={innerRef}
					{...props}
				/>
			</div>
			<Error error={error} />
		</div>
	);
};

export default Input;
