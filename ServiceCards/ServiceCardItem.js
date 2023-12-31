import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { serviceTypes } from "constant";
import { routes } from "routes";

import ChevronUp from "icons/chevronUp.svg";
import DefaultImageIcon from "icons/defaultImage.svg";

const MobileDescription = ({ description }) => {
	const { t } = useTranslation();
	const [fullDescriptionVisibility, setFullDescriptionVisibility] = useState(false);
	const onReadMore = () => {
		setFullDescriptionVisibility(value => !value);
	};
	if (!description) {
		return null;
	}
	return (
		<div className='relative'>
			<p
				className={clsx(
					"typographyXSmallRegular text-fg-subtle",
					!fullDescriptionVisibility && "line-clamp-1"
				)}
			>
				{description}
			</p>
			<button
				className={clsx(
					"typographyXSmallRegular flex text-accent-default",
					!fullDescriptionVisibility &&
						"bg-white-gradient absolute top-[3px] w-full items-center py-[6px] text-left"
				)}
				onClick={onReadMore}
			>
				{fullDescriptionVisibility ? t("search.showLess") : t("search.showMore")}
				<ChevronUp
					width='16px'
					height='16px'
					className={clsx(" ml-sm", !fullDescriptionVisibility && " rotate-180")}
				/>
			</button>
		</div>
	);
};

const Description = ({ description }) => {
	return <p className=' typographyCaptionRegular text-fg-subtle'>{description}</p>;
};

const ServiceCardItem = ({ address, companyName, serviceName, description, image, id, type }) => {
	const [__isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		setIsMobile(isMobile);
	}, []);

	const onServiceCardClick = e => {
		if (e.target.tagName === "BUTTON") {
			e.preventDefault();
		}
	};

	const serviceLink =
		type === serviceTypes.MAIN ? `${routes.service}/${id}` : `${routes.subServices}/${id}`;

	return (
		<Link
			href={serviceLink}
			onClick={onServiceCardClick}
			className='flex min-h-[120px] rounded-[10px]  shadow-shadow-theme-20 xl:min-h-[192px]'
		>
			<div
				className={clsx(
					"relative flex  w-[72px] min-w-[72px] shrink items-center justify-center",
					"rounded-tl-[10px] rounded-bl-[10px] bg-fg-default bg-opacity-5 xl:w-[144px]"
				)}
			>
				{image ? (
					<Image
						src={image}
						fill
						className='rounded-tl-[10px] rounded-bl-[10px] object-cover object-center'
					/>
				) : (
					<DefaultImageIcon className=' text-fg-muted ' />
				)}
			</div>
			<div className='min-w-[200px] overflow-hidden pl-md pr-lg pt-sm pb-[12px] xl:px-lg xl:pt-lg xl:pb-md'>
				<p className='typographyTinyRegular flex items-center text-fg-subtle xl:typographyXSmallRegular'>
					{companyName}
					<span className='relative block w-[13px]'>
						<span className='absolute top-1/2 left-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-fg-subtle'></span>
					</span>
					{address}
				</p>
				<h3 className='typographyInputLargeRegular text-fg-default xl:typographyLeadRegular'>
					{serviceName}
				</h3>
				{__isMobile ? (
					<MobileDescription description={description} />
				) : (
					<Description description={description} />
				)}
			</div>
		</Link>
	);
};

export default ServiceCardItem;
