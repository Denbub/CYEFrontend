import clsx from "clsx";
import { useState } from "react";

const Toggle = ({ initialState = false, onToggleChange }) => {
	const [checked, setChecked] = useState(initialState);

	const handleChange = () => {
		setChecked(checked => !checked);
		onToggleChange && onToggleChange();
	};

	return (
		<label
			htmlFor='toggle'
			className={clsx(
				"relative flex h-[20px] w-[36px] cursor-pointer select-none rounded-[10px]",
				"items-center bg-accent-default align-middle transition duration-200 ease-in"
			)}
		>
			<input
				type='checkbox'
				name='toggle'
				id='toggle'
				className={clsx(
					"absolute block h-[12px] w-[12px] transform-gpu appearance-none rounded-full ",
					"cursor-pointer bg-white transition-transform",
					checked ? "translate-x-[20px]" : "translate-x-[4px]"
				)}
				checked={checked}
				onChange={handleChange}
			/>
		</label>
	);
};

export default Toggle;
