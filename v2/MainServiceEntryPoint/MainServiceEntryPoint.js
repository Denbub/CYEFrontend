import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMainService } from "slices";

import SubserviceCard from "components/v2/SubserviceCard";

const MainServiceEntryPoint = ({ companyId, profilePage }) => {
	const { t } = useTranslation();
	const mainService = useSelector(state => state.service.mainService);
	const dispatch = useDispatch();

	useEffect(() => {
		if (companyId) {
			dispatch(fetchMainService(companyId));
		}
	}, [companyId]);

	if (!Object.keys(mainService).length || !mainService.id) {
		return null;
	}

	return (
		<div className='mb-xl xl:mb-[80px]'>
			<h5 className='typographyHeadline-5Bold mb-md  text-fg-default xl:typographyHeadline-2Bold xl:mb-xl'>
				{t("mainService")}
			</h5>
			<SubserviceCard {...mainService} subService profilePage={profilePage} />
		</div>
	);
};

export default MainServiceEntryPoint;
