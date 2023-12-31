import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSocialMediaLinks, openDrawer } from "slices";

import EditButton from "components/v2/EditButton";

const SocialMediaLinks = ({ companyId, profilePage }) => {
	const socialMediaLinks = useSelector(state => state.socialMediaLinks.links);
	const dispatch = useDispatch();

	const onEditButton = () => {
		dispatch(openDrawer());
	};

	useEffect(() => {
		if (companyId) {
			dispatch(fetchSocialMediaLinks(companyId));
		}
	}, [companyId]);

	return (
		<ul className='flex gap-sm overflow-y-auto xl:justify-end'>
			{socialMediaLinks.map(({ icon, id, name, url }) => {
				return (
					<li key={id}>
						<a
							href={url}
							className='flex h-[32px] w-[32px] items-center justify-center rounded-full bg-fg-on-accent shadow-shadow-theme-20'
							target='_blank'
							rel='noreferrer'
						>
							<Image
								src={icon}
								width={16}
								height={16}
								alt={name}
								className='h-md w-md'
							/>
						</a>
					</li>
				);
			})}
			{profilePage && (
				<li>
					<EditButton onClick={onEditButton} />
				</li>
			)}
		</ul>
	);
};

export default SocialMediaLinks;
