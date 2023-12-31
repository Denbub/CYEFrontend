import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "routes";
import { getCompanyId, getProfileEntryPointData } from "selectors";
import { fetchCompanyEntryPoint, fetchMainService } from "slices";

import { SubserviceItem } from "components/Subservices";

import { Title } from "./ProfileEntryPoint.style";

const ProfileEntryPoint = ({ from }) => {
	const { t } = useTranslation();
	const companyId = useSelector(getCompanyId);
	const profileData = useSelector(getProfileEntryPointData);
	const dispatch = useDispatch();

	useEffect(() => {
		if (companyId && from === "service") {
			dispatch(fetchMainService(companyId));
		} else {
			dispatch(fetchCompanyEntryPoint());
		}
	}, [companyId, from]);

	if (!profileData) {
		return null;
	}

	return (
		<div>
			<Title>{t("mainService")}</Title>
			<SubserviceItem {...profileData} href={routes.profile} />
		</div>
	);
};

export default ProfileEntryPoint;
