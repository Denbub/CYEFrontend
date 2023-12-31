import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

import { getSocialMediaLinksConfig } from "selectors";

import Slider from "elements/v2/Drawer/Slider";
import TextInfoRow from "elements/v2/Drawer/TextInfoRow";

const SocialMedia = ({ socialMedia }) => {
	const { t } = useTranslation();
	const socialMediaLinksConfig = useSelector(getSocialMediaLinksConfig);
	if (!Object.keys(socialMediaLinksConfig).length) {
		return null;
	}
	return (
		<Slider title={t("drawer.team.titleSocialMedia")}>
			{socialMedia &&
				socialMedia.map((item, index) => {
					return (
						<TextInfoRow
							value={item.url}
							label={socialMediaLinksConfig[item.id]?.name}
							key={index}
						/>
					);
				})}
		</Slider>
	);
};

export default SocialMedia;
