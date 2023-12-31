import clsx from "clsx";

import DrawerInputRow from "elements/v2/Drawer/InputRow";
import TextCell from "elements/v2/Drawer/TextCell";
import Label from "elements/v2/Label";

const TextInfoRow = ({ label, value, required, className = "" }) => {
	return (
		<>
			<DrawerInputRow>
				<Label
					label={label}
					required={required}
					className={clsx("!typographySmallRegular", className)}
				/>
				<TextCell>{value}</TextCell>
			</DrawerInputRow>
		</>
	);
};

export default TextInfoRow;
