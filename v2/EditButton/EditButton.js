import clsx from "clsx";

import EditIcon from "icons/edit.svg";
import ImageLineIcon from "icons/imageLine.svg";
import MinusSvg from "icons/minus.svg";
import PlusIcon from "icons/plus.svg";
import TrashIcon from "icons/trash.svg";
import ZoomIcon from "icons/zoom.svg";

const sizes = {
	32: "h-[32px] w-[32px]",
	40: "h-[40px] w-[40px]",
	48: "h-[48px] w-[48px]"
};

const EditButton = ({ size = 32, className, iconName = "edit", onClick, withShadow, innerRef }) => {
	const dynamicClassName = clsx(
		"bg-fg-on-accent rounded-full flex justify-center items-center",
		sizes[size],
		withShadow && "shadow-editButton",
		className
	);

	const iconClassName = clsx(size === 48 && "transform scale-150");

	const icons = {
		edit: EditIcon,
		image: ImageLineIcon,
		plus: PlusIcon,
		trash: TrashIcon,
		minus: MinusSvg,
		zoom: ZoomIcon
	};

	const Icon = icons[iconName];

	return (
		<button className={dynamicClassName} onClick={onClick} ref={innerRef}>
			<Icon className={iconClassName} />
		</button>
	);
};

export default EditButton;
