import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { deleteDocument } from "slices";

import Modal from "components/v2/Modal";
import Button from "elements/v2/Button";

import FileArrowDown from "icons/fileArrowDown.svg";
import TrashDelete from "icons/trash3.svg";

import { generateShortName } from "utilities";

const TextCellWithDelete = ({ file = {} }) => {
	const { id, url, name } = file;
	const [currentName, setCurrentName] = useState("");
	const [showModal, setShowModal] = useState(false);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	useEffect(() => {
		setCurrentName(generateShortName(name));
	}, [name]);

	const handleShowModal = () => {
		setShowModal(true);
	};
	const handleHideModal = () => {
		setShowModal(false);
	};

	const handleDeleteFile = () => {
		dispatch(deleteDocument(id));
		setShowModal(false);
	};
	if (!id) return null;
	return (
		<>
			<span
				className='typographySmallRegular flex min-w-[316px] items-center justify-between text-fg-default'
				title={name}
			>
				{currentName}
				<div className='ml-[20px] flex gap-[20px]'>
					<a href={url} target='_blank' rel='nofollow noreferrer' download>
						<FileArrowDown alt='' className='cursor-pointer' />
					</a>
					<TrashDelete onClick={handleShowModal} className='cursor-pointer' alt='' />
				</div>
			</span>
			<Modal opened={showModal}>
				<h5 className='typographyHeadline-5Bold pb-sm'>
					{t("drawer.documents.modalDelete.header")}
				</h5>
				<div className='typographySmallRegular pb-lg text-fg-subtle'>
					{t("drawer.documents.modalDelete.description")}
				</div>
				<div className='flex justify-end'>
					<Button
						type='button'
						color='transparent'
						width='custom'
						className='!typographyButtonNormalBold mr-sm h-[32px] !min-w-[89px]'
						size='small'
						onClick={handleHideModal}
					>
						{t("drawer.button.abort")}
					</Button>
					<Button
						type='button'
						color='default'
						size='small'
						width='custom'
						className='typographyButtonNormalBold h-[32px] !min-w-[89px]'
						onClick={handleDeleteFile}
					>
						{t("drawer.team.removeMember")}
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default TextCellWithDelete;
