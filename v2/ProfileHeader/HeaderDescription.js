import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";

import getConfig from "next/config";

import { getCompany } from "selectors";
import { openDrawer } from "slices";

import EditButton from "components/v2/EditButton";

import SettingIcon from "icons/settings.svg";

const { publicRuntimeConfig } = getConfig();

const HeaderDescription = ({ title, description, price, profilePage }) => {
	const { t } = useTranslation();
	const activeServices = useSelector(state => getCompany(state).activeServices);
	const dispatch = useDispatch();

	const onEditButton = () => {
		dispatch(openDrawer());
	};

	return (
		<div className='relative mb-[37px] mt-[32px] xl:ml-[224px] xl:w-[432px]'>
			<div className='mb-lg flex items-center'>
				<h1 className=' typographyHeadline-4Regular  text-fg-on-accent'>{title}</h1>
				{profilePage && <EditButton className='ml-sm' onClick={onEditButton} />}
			</div>

			<p className='typographyCaptionRegular mb-lg text-fg-on-accent'>{description}</p>
			<div className='flex items-center justify-between'>
				{!publicRuntimeConfig.IS_PROD && !!price && (
					<span className=' typographyBodyBold text-fg-on-accent'>
						{t("service.header.price", { price })}
					</span>
				)}
				{activeServices > 0 && (
					<div className='flex items-center justify-center '>
						<SettingIcon className='mr-[4px]' />
						<span className=' typographyCaptionRegular text-fg-on-accent'>
							{t("service.header.activeServices", { activeServices })}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default HeaderDescription;
