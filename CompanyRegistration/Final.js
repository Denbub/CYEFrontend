import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { companyRegistrationStatus } from "constant";

import { checkStatus } from "slices";

import Button from "elements/v2/Button";
import { routes } from "routes";

const Final = ({ status, companyId }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (companyId) {
			dispatch(checkStatus());
		}
	}, [companyId]);

	return (
		<div>
			<p
				className={clsx(
					"typographyLeadRegular pb-[140px] pt-xl",
					"xl:typographyHeadline-2Regular xl:pb-[306px] xl:pt-[148px] xl:text-center"
				)}
			>
				{t("companyRegistration.final.description")}
			</p>
			{status !== companyRegistrationStatus.onboarding && (
				<Link href={routes.serviceAdd}>
					<Button hasArrowRight>{t("companyRegistration.final.button")}</Button>
				</Link>
			)}
		</div>
	);
};

export default Final;
