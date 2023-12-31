import CompanyImage from "components/v2/CompanyImage";
import ReportLink from "components/v2/ReportLink";
import SocialMediaLinks from "components/v2/SocialMediaLinks";

import HeaderBackground from "./HeaderBackground";
import HeaderDescription from "./HeaderDescription";

const ProfileHeader = ({
	title,
	description,
	price,
	companyId,
	serviceProfile,
	companyProfile,
	onReportLinkClick
}) => {
	const profilePage = serviceProfile || companyProfile;

	return (
		<div className='relative mb-lg py-md xl:mb-[162px]'>
			<HeaderBackground profilePage={profilePage} />
			<div className='container absolute bottom-0 left-1/2 z-30 -translate-x-1/2 translate-y-1/2 transform'>
				<CompanyImage title={title} profilePage={profilePage} />
			</div>
			<div className='container relative z-30'>
				{!profilePage && (
					<ReportLink
						className='absolute top-0 right-0 text-fg-on-accent maxXl:hidden'
						onReportLinkClick={onReportLinkClick}
					/>
				)}
				<HeaderDescription
					title={title}
					description={description}
					price={price}
					profilePage={profilePage}
				/>
				<SocialMediaLinks companyId={companyId} profilePage={profilePage} />
			</div>
		</div>
	);
};

export default ProfileHeader;
