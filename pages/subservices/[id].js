import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { serviceGridClassName } from "styleHelpers";

import { getServiceData } from "selectors";
import { clearService, fetchCompanyUserViewData, fetchService } from "slices";

import ImageGallery from "components/v2/ImageGallery";
import MainServiceEntryPoint from "components/v2/MainServiceEntryPoint";
import ProfileDescription from "components/v2/ProfileDescription";
import ReportModal from "components/v2/ReportModal";
import ServiceInfoTable from "components/v2/ServiceInfoTable";
import ServiceMap from "components/v2/ServiceMap";
import ServicePrivacySection from "components/v2/ServicePrivacySection";
import SubserviceHeader from "components/v2/SubserviceHeader";
import useBingApi from "hooks/useBingApi";

const Subservice = ({ id }) => {
	const { companyId, title, description } = useSelector(getServiceData);
	const dispatch = useDispatch();

	const [openReportModal, setOpenReportModal] = useState(false);

	const { bingApiReady } = useBingApi();

	const onReportLinkClick = () => {
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
		};
	}, []);

	return (
		<>
			<div className='bg-bg-canvas pb-[56px] pt-[22px] xl:pb-[120px]'>
				<div className='container bg-bg-canvas '>
					<SubserviceHeader onReportLinkClick={onReportLinkClick} />
					<ImageGallery />
					<div className={serviceGridClassName}>
						<ProfileDescription title={title} description={description} />
						<ServiceInfoTable />
						<ServiceMap bingApiReady={bingApiReady} />
					</div>
					<MainServiceEntryPoint companyId={companyId} />
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

export default Subservice;
