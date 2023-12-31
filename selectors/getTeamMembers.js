import { createSelector } from "@reduxjs/toolkit";

import getSocialMediaLinksConfig from "./getSocialMediaLinksConfig";

const getTeamMembers = state => state.team.teamMembers;

export default createSelector(
	getTeamMembers,
	getSocialMediaLinksConfig,
	(teamMembers, socialMediaLinksConfig) => {
		return teamMembers.map(member => {
			return {
				...member,
				social_media: member.social_media.map(socialMedia => {
					return {
						...socialMedia,
						iconUrl: socialMediaLinksConfig[socialMedia.id]?.icon
					};
				})
			};
		});
	}
);
