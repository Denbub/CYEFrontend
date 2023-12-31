import clsx from "clsx";
import LogoutIcon from "icons/logout.svg";

const LogoutButton = ({ onClick }) => (
	<div
		className={clsx(
			"ml-auto flex h-[36px] w-[36px] cursor-pointer",
			"items-center justify-center rounded-full bg-grey-950"
		)}
		onClick={onClick}
	>
		<LogoutIcon />
	</div>
);

export default LogoutButton;
