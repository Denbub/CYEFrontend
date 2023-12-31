import EditIcon from "icons/pen.svg";

import Button from "./EditButton.style";

const EditButton = props => {
	return (
		<Button {...props}>
			<EditIcon />
		</Button>
	);
};

export default EditButton;
