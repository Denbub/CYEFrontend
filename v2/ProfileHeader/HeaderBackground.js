import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCompany } from "selectors";
import { updateCompanyBgImage } from "slices";

import AgreementsModal from "components/AgreementsModal";
import EditButton from "components/v2/EditButton";
import Overlay from "elements/v2/Overlay";

import DefaultImageIcon from "icons/defaultImage.svg";

import EditModal from "./EditModal";

const HeaderBackground = ({ profilePage }) => {
	const [showModal, setShowModal] = useState(false);
	const [showAgreementsModal, setShowAgreementsModal] = useState(false);
	const companyBg = useSelector(state => getCompany(state)?.bg_image);
	const dispatch = useDispatch();

	const onModalClose = useCallback(() => {
		setShowModal(false);
	}, []);

	const onModalOpen = () => {
		setShowModal(true);
	};

	const onAgreementsModalClose = () => {
		setShowAgreementsModal(false);
	};

	const onDeleteButton = () => {
		setShowAgreementsModal(true);
	};

	const onDelete = () => {
		dispatch(updateCompanyBgImage(null));
		setShowAgreementsModal(false);
		setShowModal(false);
	};

	return (
		<div className='absolute inset-0 z-10 '>
			{profilePage && (
				<div className='container relative'>
					<EditButton
						iconName='image'
						className='absolute right-lg top-md z-20 xl:right-0'
						onClick={onModalOpen}
					/>
				</div>
			)}
			<Overlay className=' z-10 opacity-[45%]' />
			{companyBg ? (
				<Image src={companyBg} fill className='object-cover object-center' />
			) : (
				<DefaultImageIcon
					className={clsx(
						" transform-gp -translate-x-1/2 -translate-y-1/2 scale-150",
						"absolute top-1/2 left-1/2 text-fg-muted"
					)}
				/>
			)}
			{!showAgreementsModal && showModal && (
				<EditModal
					onModalClose={onModalClose}
					onDeleteButton={onDeleteButton}
					companyBg={companyBg}
					updateImage={updateCompanyBgImage}
				/>
			)}
			{showAgreementsModal && (
				<AgreementsModal
					onClose={onAgreementsModalClose}
					onReject={onAgreementsModalClose}
					onConfirm={onDelete}
				/>
			)}
		</div>
	);
};

export default HeaderBackground;
