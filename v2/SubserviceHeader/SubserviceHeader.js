import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import ReportLink from "components/v2/ReportLink";

import BackIcon from "icons/back.svg";

const SubserviceHeader = ({ profilePage, onReportLinkClick }) => {
	const { t } = useTranslation();
	const title = useSelector(state => state.service.shortTitle);
	const address = useSelector(state => state.service.address);
	const router = useRouter();

	const goBack = () => router.back();

	return (
		<div className='mb-[32px]'>
			<button
				onClick={goBack}
				className=' typographyButtonNormalBold mb-[22px] flex items-center text-accent-default'
			>
				<BackIcon className='mr-sm' />
				{t("backButton.text")}
			</button>
			<div className='relative flex justify-between'>
				<h1 className='typographyHeadline-4Regular text-fg-default'>{title}</h1>
				{!profilePage && (
					<ReportLink
						className='absolute top-[10px] right-0 maxXl:hidden'
						onReportLinkClick={onReportLinkClick}
					/>
				)}
			</div>
			{address && (
				<span className='typographyInputLargeRegular mt-md text-fg-muted'>{address}</span>
			)}
		</div>
	);
};

export default SubserviceHeader;
