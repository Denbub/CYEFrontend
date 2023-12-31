import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import { screenSizes } from "constant";

import { deleteService, fetchSubservices } from "slices";

import Modal from "components/v2/Modal";
import SubserviceCard from "components/v2/SubserviceCard";
import SwiperNavigation from "components/v2/SwiperNavigation";
import Button from "elements/v2/Button";
import usePageWidth from "hooks/usePageWidth";

const Subservices = ({ companyId, serviceProfile, companyProfile }) => {
	const { t } = useTranslation();
	const subservices = useSelector(state => state.service.subservices);

	const [swiperVisibility, setSwiperVisibility] = useState(false);
	const [swiper, setSwiper] = useState(null);
	const [subserviceIdToDelete, setSubserviceIdToDelete] = useState("");
	const pageWidth = usePageWidth();
	const dispatch = useDispatch();

	const profilePage = serviceProfile || companyProfile;

	const onEditButton = id => () => {
		setSubserviceIdToDelete(id);
	};

	const onModalClose = () => {
		setSubserviceIdToDelete("");
	};

	const onDeleteButton = () => {
		dispatch(deleteService(subserviceIdToDelete));
		setSubserviceIdToDelete("");
	};

	useEffect(() => {
		if (companyId) {
			dispatch(fetchSubservices(companyId));
		}
	}, [companyId]);

	useEffect(() => {
		if (pageWidth < screenSizes.xl && subservices.length > 1) {
			setSwiperVisibility(true);
		} else {
			setSwiperVisibility(false);
		}
	}, [subservices.length, pageWidth]);

	if (!subservices.length) {
		return null;
	}

	return (
		<div className='relative mb-[40px] xl:mb-[115px]'>
			<h5 className='typographyHeadline-5Bold mb-md text-fg-default xl:typographyHeadline-2Bold xl:mb-xl'>
				{t("subservices")}
			</h5>
			{swiperVisibility ? (
				<>
					<Swiper
						slidesPerView={1}
						onSwiper={swiper => setSwiper(swiper)}
						spaceBetween={16}
					>
						{subservices.map(item => {
							return (
								<SwiperSlide key={item.id}>
									<SubserviceCard
										{...item}
										profilePage={profilePage}
										onEditButton={onEditButton}
									/>
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
					{subservices.map(item => {
						return (
							<SubserviceCard
								{...item}
								key={item.id}
								profilePage={profilePage}
								onEditButton={onEditButton}
							/>
						);
					})}
				</div>
			)}
			{profilePage && (
				<Modal
					opened={!!subserviceIdToDelete}
					onCloseAction={onModalClose}
					closeOnDocumentClick={true}
					className='w-[350px]'
				>
					<h5 className='typographyHeadline-5Bold mb-sm'>{t("service.delete.title")}</h5>
					<p className='typographySmallRegular mb-lg text-fg-subtle'>
						{t("service.delete.description")}
					</p>
					<div className='flex justify-end'>
						<Button
							type='button'
							className='!typographyButtonNormalBold mr-md !w-[89px] !py-[6px] !text-fg-default'
							onClick={onModalClose}
							color='transparent'
						>
							{t("cancelButton.text")}
						</Button>
						<Button
							type='button'
							className='!typographyButtonNormalBold !w-[109px] !py-[6px]'
							onClick={onDeleteButton}
						>
							{t("deleteButton.text")}
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Subservices;
