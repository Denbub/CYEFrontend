import clsx from "clsx";
import Button from "elements/v2/Button/Button";
import getConfig from "next/config";

import AddIcon from "icons/add.svg";

import CommonLink from "./CommonLink";
import HeaderLinksList from "./HeaderLinksList";
import LogoutButton from "./LogoutButton";

const { publicRuntimeConfig } = getConfig();

const MenuMobile = ({
	closeMenu,
	open,
	onLogin,
	loggedIn,
	onLogout,
	onServiceClick,
	isSplitScreen,
	t
}) => (
	<div
		className={clsx(
			"absolute top-headerMobile right-[-24px] z-[100] flex",
			"h-screen flex-col overflow-hidden bg-white text-left",
			"transition-[width] duration-[300ms] ease-in-out",
			open ? "min-w-[236px]" : "w-0"
		)}
	>
		<div className={clsx("pr-[10px]", "pl-[20px]", open ? "visible" : "invisible")}>
			{!isSplitScreen && <HeaderLinksList mobileView closeMenu={closeMenu} />}
			{!loggedIn && (
				<div className='mt-5 flex flex-col items-end gap-5 [&_svg]:cursor-pointer'>
					<Button
						width='auto'
						text={t("header.loginButton")}
						className={clsx(
							"h-[40px] px-[16px]",
							"transition-[color] duration-[0.2s] ease-linear"
						)}
						size='regular'
						onClick={onLogin}
					/>

					<CommonLink
						href='https://www.facebook.com/groups/clickyourevent/'
						target='_blank'
					>
						{t("header.communityButton")}
					</CommonLink>
				</div>
			)}

			{loggedIn && (
				<>
					{!isSplitScreen && (
						<Button
							width='auto'
							className={clsx(
								"mt-5 h-[40px] gap-[10px] px-[16px]",
								"transition-[color] duration-[0.2s] ease-linear"
							)}
							size='regular'
							onClick={onServiceClick}
						>
							<AddIcon className='ml-[4px]' />
							{t("header.addServiceButton")}
						</Button>
					)}

					<div className='mt-5 flex items-center justify-between'>
						<LogoutButton onClick={onLogout} />
					</div>
				</>
			)}
		</div>
	</div>
);

export default MenuMobile;
