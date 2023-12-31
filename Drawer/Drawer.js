import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

import { closeDrawer } from "slices";

import DrawerContact from "components/DrawerContact";
import DrawerDeleteAccount from "components/DrawerDeleteAccount";
import DrawerFiles from "components/DrawerFiles";
import DrawerInfo from "components/DrawerInfo";
import DrawerLocation from "components/DrawerLocation";
import DrawerTeam from "components/DrawerTeam";

import CloseDrawer from "icons/closeDrawer.svg";

const Drawer = ({ serviceProfile, bingApiReady }) => {
	const opened = useSelector(state => state.drawer.opened);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const onClose = () => {
		dispatch(closeDrawer());
	};

	return (
		<>
			{opened && (
				<div
					className='fixed top-0 left-0 z-[998] h-screen w-screen bg-black/20 '
					onClick={onClose}
				/>
			)}
			<div
				className={clsx(
					"fixed top-0 z-[998] flex h-screen w-full flex-col md:w-[736px]",
					"bg-white transition-[right]",
					opened ? "right-0" : "-right-[736px]"
				)}
			>
				<div
					className={clsx(
						"sticky flex items-center justify-between px-[24px] py-[14px]",
						"border-b-[1px] border-border-default"
					)}
				>
					<p className='typographyLeadRegular'>{t("drawer.profile.title")}</p>
					<div className='cursor-pointer p-[5px]' onClick={onClose}>
						<CloseDrawer />
					</div>
				</div>
				{opened && (
					<div className='overflow-y-auto p-[24px]'>
						<DrawerInfo />
						<DrawerContact />
						<DrawerLocation
							serviceProfile={serviceProfile}
							bingApiReady={bingApiReady}
						/>
						<DrawerFiles />
						<DrawerTeam />
						<DrawerDeleteAccount />
					</div>
				)}
			</div>
		</>
	);
};

export default Drawer;
