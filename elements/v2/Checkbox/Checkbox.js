import { useState } from "react";

import clsx from "clsx";

import Error from "elements/v2/Error";

import CheckboxIcon from "icons/checkbox.svg";

import CheckboxCheckedIcon from "icons/checkboxChecked.svg";

const CheckboxContainer = ({ className, label, active, setFieldValue, name, error, touched }) => {
	const [checked, setChecked] = useState(active);

	const handleClick = e => {
		setChecked(prev => {
			setFieldValue(name, !prev);
			return !prev;
		});
	};
	return (
		<div>
			<div className='flex cursor-pointer' onClick={handleClick}>
				<div className='mr-[12px]'>
					{checked ? <CheckboxCheckedIcon /> : <CheckboxIcon />}
				</div>
				<div className={clsx(className)} dangerouslySetInnerHTML={{ __html: label }} />
			</div>
			{touched && <Error error={error} />}
		</div>
	);
};
export default CheckboxContainer;
