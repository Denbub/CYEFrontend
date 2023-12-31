import clsx from "clsx";

import Notification from "components/v2/Notification";

const HeaderLayout = ({
	children,
	menuVisibility,
	isSplitScreen,
	closeMenu,
	isMobile,
	safariOldVersion
}) => (
	<>
		<header
			className={clsx("top-0 z-[1000] w-full", isSplitScreen ? "absolut" : "sticky bg-white")}
		>
			{safariOldVersion && (
				<Notification type='warning' text='notification.safariVersion.text' />
			)}
			{
				<Notification
					type='info'
					text='notification.beta.text'
					links={[
						{
							type: "link",
							text: "notification.beta.linkText",
							link: "notification.beta.link"
						},
						{
							type: "email",
							text: "notification.beta.emailText",
							link: "notification.beta.email"
						}
					]}
				/>
			}
			<div className={clsx("container mx-auto h-full", isMobile ? "px-[24px]" : "px-sm")}>
				<div
					className={clsx(
						"relative z-[100] flex justify-between",
						isMobile ? "py-[18px]" : "py-[34px]"
					)}
				>
					{children}
				</div>
			</div>
			{menuVisibility && (
				<div
					className='absolute left-0 z-[99] h-screen w-screen bg-black/50'
					onClick={closeMenu}
				/>
			)}
		</header>
	</>
);

export default HeaderLayout;
