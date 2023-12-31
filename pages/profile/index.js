import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withAuth } from "utilities/auth";

import { getCompanyId } from "selectors";
import { fetchServices } from "slices";

import Company from "components/Company";
import Service from "components/Service";
import ServicePrivacySection from "components/v2/ServicePrivacySection";
import useBingApi from "hooks/useBingApi";

import "swiper/css";

const Profile = () => {
	const dispatch = useDispatch();
	const companyId = useSelector(getCompanyId);
	const services = useSelector(state => state.service.services);
	const hasMainService = useSelector(state => state.company.companyInfo?.has_main_service);

	const { bingApiReady } = useBingApi();

	useEffect(() => {
		if (companyId) {
			dispatch(fetchServices(companyId));
		}
	}, [companyId]);

	let Component = Company;

	if (services?.length && hasMainService) {
		Component = Service;
	}

	return (
		<div className='bg-bg-canvas pb-[56px] xl:pb-[120px]'>
			<Component bingApiReady={bingApiReady} />
			<ServicePrivacySection companyId={companyId} profilePage />
		</div>
	);
};

export const getServerSideProps = async context => {
	return withAuth(context, async () => {
		return {
			props: {
				...(await serverSideTranslations(context.locale, ["common", "cookie"]))
			}
		};
	});
};

export default Profile;
