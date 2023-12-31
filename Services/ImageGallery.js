import clsx from "clsx";
import Image from "next/image";

import Carousel from "components/Carousel";

const ImageGalleryItem = ({ item }) => {
	const { image, title, id } = item;
	return (
		<div key={id} className='relative h-[320px] xl:h-[600px]'>
			<Image src={image} alt={title} fill />

			{title && (
				<div
					className={clsx(
						"typographyHeadline-5Bold  absolute bottom-[57px] left-0 right-0 mx-auto mb-sm w-[30%] text-center text-fg-on-accent"
					)}
				>
					{title}
				</div>
			)}
		</div>
	);
};
const ImageGallery = ({ component }) => {
	const { title, items } = component;
	return (
		<div className='container'>
			<div>
				{title && (
					<h2
						className={clsx(
							"typographyHeadline-5Bold",
							"mb-lg xl:typographyHeadline-2Bold",
							"xl:mb-l"
						)}
					>
						{title}
					</h2>
				)}
				<div className='relative'>
					<Carousel
						slidesPerView={1}
						items={items}
						renderComponent={ImageGalleryItem}
						arrowMobile
						pagination={{
							modifierClass: "pagination-",
							clickable: true,
							bulletClass: "pagination-bullet rounded-full",
							bulletActiveClass: "pagination-bullet-active",

							horizontalClass: "pagination-bullets bottom-lg"
						}}
						arrowsConfig={{
							size: "large",
							opacity: true,
							inset: "inner",
							arrowCenter: true
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageGallery;
