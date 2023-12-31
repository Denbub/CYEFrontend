import clsx from "clsx";
import { useTranslation } from "next-i18next";
import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";

import { companyRegistrationStatus } from "constant";
import { routes } from "routes";
import { removeBearerToken } from "services/axios";
import { signOut } from "utilities/auth";

import { getCompany } from "selectors";
import { getLoggedIn, logout } from "slices";
import { getBrowserVersion } from "utilities";

import Burger from "components/Burger";
import Logo from "components/Logo";
import Button from "elements/v2/Button/Button";

import AddIcon from "icons/add.svg";
import SearchIcon from "icons/searchHeader.svg";

import CommonLink from "./CommonLink";
import HeaderLayout from "./HeaderLayout";
import HeaderLinksList from "./HeaderLinksList";
import Language from "./Language";
import LogoutButton from "./LogoutButton";
import MenuMobile from "./MenuMobile";
import ProfileImage from "./ProfileImage";

const { publicRuntimeConfig } = getConfig();

const Header = () => {
	const [menuVisibility, setMenuVisibility] = useState(false);
	const [__isMobile, setIsMobile] = useState(null);
	const [profileVisibility, setProfileVisibility] = useState(false);
	const [safariOldVersion, setSafariOldVerstion] = useState(false);

	const loggedIn = useSelector(getLoggedIn);
	const { id: companyId, status } = useSelector(getCompany);

	const services = useSelector(state => state.service.services);

	const router = useRouter();
	const { t } = useTranslation();

	const dispatch = useDispatch();

	const isSplitScreen = router.pathname === routes.companyRegistration;

	const toggleMenu = () => {
		setMenuVisibility(menuVisibility => !menuVisibility);
	};

	const closeMenu = () => {
		__isMobile && setMenuVisibility(false);
	};

	const onLogout = () => {
		signOut();
		removeBearerToken();
		dispatch(logout());
		router.push(routes.home);
		closeMenu();
	};

	const onLogin = () => {
		router.push(routes.login);
		closeMenu();
	};

	const onRegistration = () => {
		router.push(routes.registration);
		closeMenu();
	};

	const onProfileClick = () => {
		router.push(routes.profile);
		closeMenu();
	};

	const onServiceClick = () => {
		router.push(
			companyId && status !== companyRegistrationStatus.onboarding
				? routes.serviceAdd
				: routes.companyRegistration
		);
		closeMenu();
	};

	useEffect(() => {
		setIsMobile(isMobile);
		const version = getBrowserVersion();
		if (parseFloat(version) < 15.4) {
			setSafariOldVerstion(true);
		}
	}, []);

	useEffect(() => {
		setProfileVisibility(services?.length || companyId);
	}, [companyId, services]);

	if (__isMobile === null) {
		return (
			<HeaderLayout isMobile={__isMobile} safariOldVersion={safariOldVersion}>
				<Logo />
			</HeaderLayout>
		);
	}

	if (__isMobile) {
		return (
			<HeaderLayout
				menuVisibility={menuVisibility}
				closeMenu={closeMenu}
				isSplitScreen={isSplitScreen}
				safariOldVersion={safariOldVersion}
				isMobile
			>
				<div className='flex w-full justify-between'>
					<div>
						<Logo white={isSplitScreen} isMobile />
					</div>
					<div className='flex items-center gap-[16px]'>
						<Language white={isSplitScreen} />
						{!loggedIn && (
							<Button
								width='auto'
								text={t("header.registrationButton")}
								color='orange-500'
								className={clsx(
									"h-[40px] px-[16px]",
									"transition-[color] duration-[0.2s] ease-linear hover:text-black"
								)}
								size='regular'
								onClick={onRegistration}
							/>
						)}

						{loggedIn && profileVisibility && <ProfileImage onClick={onProfileClick} />}
						{isSplitScreen ? (
							<LogoutButton onClick={onLogout} />
						) : (
							<Burger clickMenu={toggleMenu} open={menuVisibility} />
						)}
					</div>
				</div>
				<MenuMobile
					open={menuVisibility}
					onLogin={onLogin}
					closeMenu={closeMenu}
					loggedIn={loggedIn}
					onLogout={onLogout}
					onServiceClick={onServiceClick}
					isSplitScreen={isSplitScreen}
					t={t}
				/>
			</HeaderLayout>
		);
	}

	return (
		<HeaderLayout isSplitScreen={isSplitScreen}>
			<div>
				<Logo white={isSplitScreen} />
			</div>
			{!isSplitScreen && <HeaderLinksList closeMenu={closeMenu} />}
			{!loggedIn && (
				<div className='flex items-center gap-[24px] [&_svg]:cursor-pointer'>
					<Language />
					<Link href={routes.search}>
						<SearchIcon />
					</Link>

					<Button
						width='auto'
						color='orange-500'
						text={t("header.registrationButton")}
						className={clsx(
							"h-[40px] w-auto px-[16px] hover:text-black",
							"transition-[color] duration-[0.2s] ease-linear"
						)}
						size='regular'
						onClick={onRegistration}
					/>

					<Button
						width='auto'
						text={t("header.loginButton")}
						className={clsx(
							"h-[40px] w-auto px-[16px] hover:text-black",
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
				<div className='flex items-center gap-[24px] [&_svg]:cursor-pointer'>
					<Language />
					<Link href={routes.search}>
						<SearchIcon />
					</Link>
					{profileVisibility && <ProfileImage onClick={onProfileClick} />}
					{!isSplitScreen && (
						<Button
							width='auto'
							className={clsx(
								"h-[40px] w-auto gap-[10px] px-[16px] hover:text-black",
								"transition-[color] duration-[0.2s] ease-linear"
							)}
							size='regular'
							onClick={onServiceClick}
						>
							<AddIcon className='ml-[4px]' />
							{t("header.addServiceButton")}
						</Button>
					)}

					<LogoutButton onClick={onLogout} />
				</div>
			)}
		</HeaderLayout>
	);
};

export default Header;
