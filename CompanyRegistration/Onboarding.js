import clsx from "clsx";
import Button from "elements/v2/Button";
import { useTranslation } from "next-i18next";

const Onboarding = ({ url }) => {
	const { t } = useTranslation();

	return (
		<div>
			<p
				className={clsx(
					"typographyLeadRegular pb-xxl pt-xl",
					"xl:typographyHeadline-2Regular xl:pb-[252px] xl:pt-[148px] xl:text-center"
				)}
			>
				{t("companyRegistration.onboarding.description")}
			</p>
			<a href={url}>
				<Button hasArrowRight>{t("companyRegistration.onboarding.button")}</Button>
			</a>
		</div>
	);
};

export default Onboarding;
