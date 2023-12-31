import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

import { routes } from "routes";

import EditButton from "components/v2/EditButton";
import Button from "elements/v2/Button";
import Overlay from "elements/v2/Overlay";

import DefaultImageIcon from "icons/defaultImage.svg";

const SubserviceCard = ({
	imageUrl,
	name,
	description,
	id,
	subService,
	profilePage,
	onEditButton
}) => {
	const { t } = useTranslation();

	let serviceLink = "";

	if (profilePage) {
		serviceLink = subService ? routes.profile : `${routes.profileSubServices}/${id}`;
	} else {
		serviceLink = subService ? `${routes.service}/${id}` : `${routes.subServices}/${id}`;
	}

	return (
		<div className='w-[327px] xl:w-[624px] maxXl:mx-auto maxXl:my-0 '>
			<div
				className={clsx(
					"relative mb-md flex h-[260px] rounded-[10px]",
					!imageUrl && "bg-overlay"
				)}
			>
				{imageUrl ? (
					<Image src={imageUrl} fill alt='' className='rounded-[10px]' />
				) : (
					<DefaultImageIcon
						className={clsx(
							"transform-gp -translate-x-1/2 -translate-y-1/2 scale-150",
							"absolute top-1/2 left-1/2 text-fg-muted"
						)}
					/>
				)}
				<Overlay className='rounded-[10px]' />
			</div>
			<p className=' typographyCaptionBold mb-[4px] text-fg-subtle'>{name}</p>
			<p className=' typographyHeadline-5Bold mb-md text-fg-default'>Company name</p>
			<p className=' typographySmallRegular mb-md text-fg-subtle'>{description}</p>
			<div className='flex items-center justify-between'>
				<Link href={serviceLink}>
					<Button className='!typographyButtonLargeBold !w-[152px] !py-sm'>
						{t("watchNow")}
					</Button>
				</Link>
				{profilePage && !subService && (
					<EditButton iconName='trash' withShadow onClick={onEditButton(id)} />
				)}
			</div>
		</div>
	);
};

export default SubserviceCard;
