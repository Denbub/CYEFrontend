import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

import { routes } from "routes";

import BackIcon from "icons/back.svg";

import { BackLink, Header, Title } from "./SubserviceHeader.style";

const SubserviceHeader = () => {
	const { t } = useTranslation();
	const title = useSelector(state => state.service.shortTitle);

	return (
		<Header>
			<BackLink href={routes.profile}>
				<BackIcon width='15px' height='13px' />
				{t("backButton.text")}
			</BackLink>

			<Title>{title}</Title>
		</Header>
	);
};

export default SubserviceHeader;
