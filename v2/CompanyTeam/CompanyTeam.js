import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { screenSizes } from "constant";

import { getTeamMembers } from "selectors";
import { fetchSocialMediaLinksConfig, fetchTeam } from "slices";

import SwiperNavigation from "components/v2/SwiperNavigation";

import TeamMember from "./TeamMember";

const CompanyTeam = ({ companyId }) => {
	const { t } = useTranslation();
	const teamMembers = useSelector(getTeamMembers);
	const [swiper, setSwiper] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (companyId) {
			dispatch(fetchTeam(companyId));
			dispatch(fetchSocialMediaLinksConfig());
		}
	}, [companyId]);

	if (!teamMembers.length) {
		return null;
	}
	return (
		<div className='relative mb-[40px] xl:mb-[80px]'>
			<h5 className='typographyHeadline-3Bold mb-md text-fg-default xl:typographyHeadline-2Bold xl:mb-xl'>
				{t("service.team.title")}
			</h5>
			{teamMembers.length > 1 ? (
				<>
					<Swiper
						slidesPerView={1}
						breakpoints={{
							[screenSizes.xl]: {
								slidesPerView: 4
							}
						}}
						onSwiper={swiper => setSwiper(swiper)}
						spaceBetween={16}
					>
						{teamMembers.map(item => {
							return (
								<SwiperSlide key={item.id}>
									<TeamMember {...item} />
								</SwiperSlide>
							);
						})}
					</Swiper>
					<div className='absolute top-0 right-0'>
						<SwiperNavigation swiper={swiper} />
					</div>
				</>
			) : (
				<div className='flex flex-wrap justify-between gap-[32px]'>
					<TeamMember key={teamMembers[0].id} {...teamMembers[0]} />
				</div>
			)}
		</div>
	);
};

export default CompanyTeam;
