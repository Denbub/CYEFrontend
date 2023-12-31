import clsx from "clsx";
import Image from "next/image";

import Overlay from "elements/v2/Overlay";

import DefaultImageIcon from "icons/defaultImage.svg";

const roundedStyles = "rounded-[10px] xl:rounded-[24px]";

const TeamMember = ({ image, name, position, summary, social_media: socialMediaLinks }) => {
	return (
		<div className='w-[327px] xl:w-[288px] maxXl:mx-auto maxXl:my-0 '>
			<div
				className={clsx(
					"relative mb-md flex h-[260px]",
					roundedStyles,
					!image && "bg-overlay"
				)}
			>
				{image ? (
					<Image src={image} fill alt='team member photo' className={roundedStyles} />
				) : (
					<DefaultImageIcon className='absolute z-10 text-fg-muted inset-center' />
				)}
				<Overlay className={roundedStyles} />
			</div>
			<div></div>
			<p className=' typographyLeadBold text-fg-default'>{name}</p>
			<p className=' typographyInputLargeRegular mb-md text-fg-subtle'>{position}</p>
			<p className=' typographySmallRegular mb-lg text-fg-muted'>{summary}</p>
			<ul className='flex flex-wrap items-center gap-lg'>
				{socialMediaLinks.map(({ id, iconUrl, url }, index) => {
					if (iconUrl && url) {
						return (
							<li key={`${id}-member-sm-${index}`}>
								<a
									href={url}
									rel='noreferrer'
									target='_blank'
									className='block h-[20px] w-[20px]'
								>
									<Image
										width={20}
										height={20}
										src={iconUrl}
										alt='team member social media'
									/>
								</a>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};

export default TeamMember;
