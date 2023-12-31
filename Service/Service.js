import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { serviceGridClassName } from "styleHelpers";

import { getCompany, getCompanyId, getServiceData } from "selectors";
import { clearService, fetchService } from "slices";

import Drawer from "components/Drawer";
import CompanyTeam from "components/v2/CompanyTeam";
import ImageGallery from "components/v2/ImageGallery";
import ProfileDescription from "components/v2/ProfileDescription";
import ProfileHeader from "components/v2/ProfileHeader";
import ServiceInfoTable from "components/v2/ServiceInfoTable";
import ServiceMap from "components/v2/ServiceMap";
import Subservices from "components/v2/Subservices";

const Service = ({ bingApiReady }) => {
	const dispatch = useDispatch();
	const companyId = useSelector(getCompanyId);
	const { description, title } = useSelector(getServiceData);
	const { shortTitle, companyDescription } = useSelector(getCompany);

	useEffect(() => {
		if (companyId) {
			dispatch(fetchService({ companyId }));
		}
	}, [companyId]);

	useEffect(() => {
		return () => {
			dispatch(clearService());
		};
	}, []);

	return (
		<>
			<ProfileHeader
				title={shortTitle}
				description={companyDescription}
				companyId={companyId}
				serviceProfile
			/>
			<div className='container'>
				<ImageGallery profilePage />
				<div className={serviceGridClassName}>
					<ProfileDescription title={title} description={description} serviceProfile />
					<ServiceInfoTable profilePage />
					<ServiceMap bingApiReady={bingApiReady} />
				</div>
				<Subservices companyId={companyId} serviceProfile />
				<CompanyTeam companyId={companyId} />
			</div>
			<Drawer serviceProfile bingApiReady={bingApiReady} />
		</>
	);
};

export default Service;
