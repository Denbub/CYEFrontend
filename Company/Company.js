import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCompany, getCompanyId } from "selectors";
import { fetchCompany } from "slices";

import Drawer from "components/Drawer";
import CompanyTeam from "components/v2/CompanyTeam";
import ImageGallery from "components/v2/ImageGallery";
import ProfileDescription from "components/v2/ProfileDescription";
import ProfileHeader from "components/v2/ProfileHeader";
import Subservices from "components/v2/Subservices";

const Company = ({ bingApiReady }) => {
	const { shortTitle, companyDescription, title, description } = useSelector(getCompany);
	const companyId = useSelector(getCompanyId);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCompany());
	}, []);

	return (
		<>
			<ProfileHeader
				title={shortTitle}
				description={companyDescription}
				companyId={companyId}
				companyProfile
			/>
			<div className='container'>
				<ImageGallery profilePage />
				<ProfileDescription title={title} description={description} companyProfile />
				<Subservices companyId={companyId} companyProfile />
				<CompanyTeam companyId={companyId} />
			</div>
			<Drawer bingApiReady={bingApiReady} />
		</>
	);
};

export default Company;
