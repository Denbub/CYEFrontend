import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { serviceGridClassName } from "styleHelpers";

import { getServiceData } from "selectors";
import { clearCompany, clearService, fetchCompanyUserViewData, fetchService } from "slices";

import CompanyTeam from "components/v2/CompanyTeam";
import ImageGallery from "components/v2/ImageGallery";
import ProfileDescription from "components/v2/ProfileDescription";
import ProfileHeader from "components/v2/ProfileHeader";
import ReportModal from "components/v2/ReportModal";
import ServiceInfoTable from "components/v2/ServiceInfoTable";
import ServiceMap from "components/v2/ServiceMap";
import ServicePrivacySection from "components/v2/ServicePrivacySection";
import Subservices from "components/v2/Subservices";
import useBingApi from "hooks/useBingApi";

import "swiper/css";

const Service = ({ id }) => {
	const { shortTitle, companyDescription, companyId, title, description, price } =
		useSelector(getServiceData);

	const [openReportModal, setOpenReportModal] = useState(false);
	const dispatch = useDispatch();

	const { bingApiReady } = useBingApi();

	const onReportLinkClick = () => {
		console.log("onReportLinkClick");
		setOpenReportModal(true);
	};

	const onModalClose = () => {
		setOpenReportModal(false);
	};

	useEffect(() => {
		dispatch(fetchService({ serviceId: id }));
	}, [id]);

	useEffect(() => {
		if (companyId) {
			dispatch(fetchCompanyUserViewData(companyId));
		}
	}, [companyId]);

	useEffect(() => {
		return () => {
			dispatch(clearService());
			dispatch(clearCompany());
		};
	}, []);

	return (
		<>
			<div className='bg-bg-canvas pb-[56px] xl:pb-[120px]'>
				<ProfileHeader
					title={shortTitle}
					description={companyDescription}
					price={price}
					companyId={companyId}
					onReportLinkClick={onReportLinkClick}
				/>

				<ImageGallery />
				<div className='container'>
					<div className={serviceGridClassName}>
						<ProfileDescription title={title} description={description} />
						<ServiceInfoTable />
						<ServiceMap bingApiReady={bingApiReady} />
					</div>
					<Subservices companyId={companyId} />
					<CompanyTeam companyId={companyId} />
					<ServicePrivacySection
						companyId={companyId}
						onReportLinkClick={onReportLinkClick}
					/>
				</div>
			</div>
			{openReportModal && (
				<ReportModal opened={openReportModal} modalCloseHandler={onModalClose} />
			)}
		</>
	);
};

export const getServerSideProps = async context => {
	return {
		props: {
			id: context.query.id,
			...(await serverSideTranslations(context.locale, ["common", "cookie"]))
		}
	};
};

export default Service;
