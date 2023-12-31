import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCompany } from "selectors";
import { updateCompanyLogo } from "slices";

import AvatarImage from "icons/avatar.svg";

import AgreementsModal from "components/AgreementsModal";
import EditModal from "components/CompanyImage/EditModal";

import Button from "elements/v2/Button";

const ImageRow = () => {
	const [showModal, setShowModal] = useState(false);
	const [showAgreementsModal, setShowAgreementsModal] = useState(false);
	const companyLogo = useSelector(state => getCompany(state)?.logo);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const onModalClose = () => {
		setShowModal(false);
	};

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
		dispatch(updateCompanyLogo(null));
		setShowAgreementsModal(false);
		setShowModal(false);
	};
	return (
		<div className='relative flex justify-between pt-[24px]'>
			<div className='relative flex w-full items-center'>
				<Image
					src={companyLogo || "/images/defaultImage.svg"}
					width='100'
					height='100'
					alt=''
					className='w-[100px] rounded-[9999px]'
				/>
				<div className='absolute left-[70px] bottom-[5px] z-[998] rounded-[9999px] bg-white p-sm'>
					<AvatarImage className='h-sm w-md' />
				</div>

				<Button
					onClick={onModalOpen}
					type='button'
					size='small'
					width='custom'
					className='typographyButtonNormalBold ml-[18px] h-[32px] min-w-fit !py-[5px] !px-[33.5px]'
				>
					{t("drawer.company.avatar.add")}
				</Button>
			</div>
			{!showAgreementsModal && showModal && (
				<EditModal
					onModalClose={onModalClose}
					onDeleteButton={onDeleteButton}
					updateImage={updateCompanyLogo}
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

export default ImageRow;
