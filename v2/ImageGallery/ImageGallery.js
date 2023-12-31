import clsx from "clsx";
import Image from "next/image";

import Carousel from "components/Carousel";
import EditButton from "components/v2/EditButton";

import DefaultImageIcon from "icons/defaultImage.svg";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import useImageGallery from "./useImageGallery";

const ImageGalleryItem = ({ item, index, carousel, profilePage, ...props }) => {
	const { deleteButton, addButton } = props;

	const { image, id } = item;

	return (
		<>
			{image ? (
				<div
					className={clsx(
						"relative w-full rounded-[16px] border border-border-default md:shadow-default",
						"flex items-center justify-center first:col-span-3 first:row-span-2",
						" xl:h-auto xl:w-auto",
						carousel ? "h-[340px]" : "h-full "
					)}
				>
					<Image src={image} fill className='rounded-[16px]' />
					{profilePage && (
						<div
							className='absolute bottom-md right-md z-[12]'
							onClick={deleteButton(id)}
						>
							<EditButton iconName='trash' withShadow />
						</div>
					)}
				</div>
			) : (
				<div
					className={clsx(
						"relative w-full rounded-[16px] border border-border-default md:shadow-default",
						"flex items-center justify-center first:col-span-3 first:row-span-2",
						" xl:h-auto xl:w-auto",
						carousel ? "h-[340px]" : "h-full"
					)}
					onClick={addButton(index)}
				>
					<DefaultImageIcon className='text-fg-muted' />
					{profilePage && (
						<div className='absolute bottom-md right-md z-[12]'>
							<EditButton iconName='plus' withShadow />
						</div>
					)}
				</div>
			)}
		</>
	);
};

const ImageGallery = ({ profilePage }) => {
	const {
		showDeleteModal,
		activeGalleryItemData,
		images,
		galleryNotEmpty,
		onAddModalClose,
		onDeleteModalClose,
		onAddButton,
		onImageDelete,
		onDeleteButton,
		swiperVisibility
	} = useImageGallery(profilePage);

	return (
		<>
			<div className='container mb-md px-md xl:mb-[50px]'>
				{swiperVisibility ? (
					<div className='relative'>
						{galleryNotEmpty ? (
							<Carousel
								slidesPerView={1}
								items={images}
								renderComponent={ImageGalleryItem}
								renderComponentProps={{
									profilePage,
									deleteButton: onDeleteButton,
									addButton: onAddButton
								}}
								arrowMobile
								pagination={{
									modifierClass: "pagination-",
									clickable: true,
									bulletClass: "pagination-bullet rounded-full",
									bulletActiveClass: "pagination-bullet-active",

									horizontalClass: "pagination-bullets"
								}}
								arrowsConfig={{
									size: "large",
									opacity: true,
									inset: "inner"
								}}
							/>
						) : (
							<ImageGalleryItem
								item={images[0]}
								carousel
								profilePage={profilePage}
								index='0'
								addButton={onAddButton}
							/>
						)}
					</div>
				) : (
					<div
						className={clsx(
							"grid grid-cols-5 grid-rows-[minmax(243px,_1fr)_minmax(243px,_1fr)] gap-md"
						)}
					>
						{images.map((image, index) => {
							return (
								<ImageGalleryItem
									item={image}
									key={`imageGalleryItem-${image.order}`}
									profilePage={profilePage}
									index={index}
									deleteButton={onDeleteButton}
									addButton={onAddButton}
								/>
							);
						})}
					</div>
				)}
			</div>

			{profilePage && (
				<>
					{showDeleteModal && (
						<DeleteModal onClose={onDeleteModalClose} onImageDelete={onImageDelete} />
					)}
					{activeGalleryItemData !== null && (
						<AddModal
							onClose={onAddModalClose}
							activeGalleryItemData={activeGalleryItemData}
						/>
					)}
				</>
			)}
		</>
	);
};

export default ImageGallery;
