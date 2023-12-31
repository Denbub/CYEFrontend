import Link from "next/link";

import { routes } from "routes";

import BlackLogo from "icons/blackLogo.svg";
import MobileBlackLogo from "icons/mobileBlackLogo.svg";
import MobileWhiteLogo from "icons/mobileWhiteLogo.svg";
import WhiteLogo from "icons/whiteLogo.svg";

const Logo = ({ white, isMobile }) => {
	if (isMobile) {
		return white ? (
			<MobileWhiteLogo />
		) : (
			<Link href={routes.home}>
				<MobileBlackLogo />
			</Link>
		);
	}

	return white ? (
		<WhiteLogo />
	) : (
		<Link href={routes.home}>
			<BlackLogo />
		</Link>
	);
};

export default Logo;
