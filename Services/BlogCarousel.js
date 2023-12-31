import clsx from "clsx";
import { format } from "date-fns";
import NextImage from "next/image";
import Link from "next/link";

import { screenSizes } from "constant";

import Carousel from "components/Carousel";

const BlogItem = ({ item }) => {
	const { image_small: image, title, created: date, slug } = item;
	const link = `/blog/${slug}`;
	return (
		<div>
			<Link href={link}>
				<NextImage
					src={image.full_url}
					alt={title}
					width='421'
					height='432'
					className='mb-[16px] rounded-[24px]'
				/>
			</Link>

			<div className={clsx("typographyCaptionRegular mb-sm  text-fg-subtle")}>
				{format(new Date(date), "QQQQQ MMMM")}
			</div>
			<Link
				href={link}
				className={clsx(
					"typographyBodyBold text-fg-default",
					" xl:typographyHeadline-5Bold"
				)}
			>
				{title}
			</Link>
		</div>
	);
};
const BlogCarousel = ({ title, items }) => {
	if (!items.length) {
		return null;
	}

	return (
		<div className='container my-[32px] xl:my-[122px]'>
			<div className='relative'>
				{title && (
					<h2
						className={clsx(
							"typographyHeadline-5Bold",
							"mb-[24px] xl:typographyHeadline-2Bold",
							"xl:mb-[32px]"
						)}
					>
						{title}
					</h2>
				)}

				<Carousel
					slidesPerView={1}
					spaceBetween={30}
					breakpoints={{
						[screenSizes.LAPTOP]: {
							slidesPerView: 3
						}
					}}
					items={items}
					renderComponent={BlogItem}
					arrowMobile
				/>
			</div>
		</div>
	);
};

export default BlogCarousel;
