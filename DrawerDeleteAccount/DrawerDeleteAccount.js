import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { deleteCompany } from "slices";
import { getCompanyId } from "selectors";

import { signOut } from "utilities/auth";

import Button from "elements/v2/Button";
import Modal from "components/v2/Modal";
import Slider from "elements/v2/Drawer/Slider";

const DrawerDeleteAccount = () => {
	const { t } = useTranslation();
	const [modalStatus, setModalStats] = useState(false);
	const dispatch = useDispatch();
	const companyId = useSelector(getCompanyId);
	const router = useRouter();

	const modalOpenHandler = () => {
		setModalStats(true);
	};
	const modalCloseHandler = () => {
		setModalStats(false);
	};

	const deleteAccountHandler = () => {
		dispatch(deleteCompany(companyId));
		signOut().then(() => {
			router.push("/");
		});
	};

	return (
		<>
			<Slider title={t("drawer.deleteAccount.sliderTitle")} className='pl-lg' style='red'>
				<h4 className='typographyBodyRegular pt-md text-fg-default'>
					{t("drawer.deleteAccount.title")}
				</h4>
				<div className='typographyCaptionRegular pt-[4px] text-fg-muted'>
					{t("drawer.deleteAccount.description")}
				</div>
				{companyId && (
					<Button
						type='button'
						color='black'
						size='small'
						width='custom'
						className='mt-lg !border-2 border-solid !border-accent-default !bg-transparent !text-accent-default'
						onClick={modalOpenHandler}
					>
						{t("drawer.deleteAccount.buttonDelete")}
					</Button>
				)}
			</Slider>
			<Modal
				opened={modalStatus}
				onCloseAction={modalCloseHandler}
				closeOnDocumentClick={true}
				showCloseButton={false}
				className='w-[350px]'
			>
				<h4 className='typographyHeadline-5Bold'>
					{t("drawer.deleteAccount.modal.title")}
				</h4>
				<div className='typographySmallRegular mt-sm text-fg-subtle'>
					{t("drawer.deleteAccount.modal.description")}
				</div>
				<div className='mt-[30px] flex justify-end'>
					<Button
						type='button'
						width='custom'
						size='small'
						className='typographyButtonNormalBold h-l !min-w-fit bg-transparent !text-fg-default'
						onClick={modalCloseHandler}
					>
						{t("drawer.deleteAccount.modal.button.no")}
					</Button>
					<Button
						type='button'
						width='custom'
						size='small'
						className='typographyButtonNormalBold h-l !min-w-fit'
						onClick={deleteAccountHandler}
					>
						{t("drawer.deleteAccount.modal.button.yes")}
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default DrawerDeleteAccount;
