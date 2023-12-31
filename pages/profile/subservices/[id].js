import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { serviceGridClassName } from "styleHelpers";
import { withAuth } from "utilities/auth";

import { getServiceData } from "selectors";
import { clearService, fetchService } from "slices";

import ImageGallery from "components/v2/ImageGallery";
import MainServiceEntryPoint from "components/v2/MainServiceEntryPoint";
import ProfileDescription from "components/v2/ProfileDescription";
import ServiceInfoTable from "components/v2/ServiceInfoTable";
import ServiceMap from "components/v2/ServiceMap";
import ServicePrivacySection from "components/v2/ServicePrivacySection";
import SubserviceHeader from "components/v2/SubserviceHeader";
import useBingApi from "hooks/useBingApi";

import "swiper/css";

const SubService = () => {
	const { companyId, title, description } = useSelector(getServiceData);

	const dispatch = useDispatch();
	const router = useRouter();

	const { bingApiReady } = useBingApi();

	const { id } = router.query;

	useEffect(() => {
		dispatch(fetchService({ serviceId: id }));
	}, [id]);

	useEffect(() => {
		return () => {
			dispatch(clearService());
		};
	}, []);

	return (
		<div className='bg-bg-canvas pb-[56px] pt-[22px] xl:pb-[120px]'>
			<div className='container'>
				<SubserviceHeader profilePage />
				<ImageGallery profilePage />
				<div className={serviceGridClassName}>
					<ProfileDescription serviceProfile title={title} description={description} />
					<ServiceInfoTable profilePage />
					<ServiceMap bingApiReady={bingApiReady} />
				</div>
				<MainServiceEntryPoint companyId={companyId} profilePage />
				<ServicePrivacySection companyId={companyId} profilePage />
			</div>
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
export default SubService;
