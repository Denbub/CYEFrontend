import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { saveTeamImage } from "slices";

import Modal from "components/v2/Modal";
import Button from "elements/v2/Button";
import ImageRow from "elements/v2/Drawer/ImageRow";
import TextInfoRow from "elements/v2/Drawer/TextInfoRow";

import AddTeamMemberForm from "./AddTeamMemberForm";
import DeleteTeamMemberForm from "./DeleteTeamMemberForm";
import SocialMedia from "./SocialMedia";

import DrawerPlusIcon from "icons/drawerPlus.svg";

const TeamMember = ({ member, loading, addMember, addMemberHandler, showAddMember = false }) => {
	const { id, image, name = "", last_name: lastName = "", position = "", summary = "" } = member;
	const { t } = useTranslation();
	const [editForm, setEditForm] = useState(false);
	const [modalStatus, setModalStats] = useState(false);
	const showEditForm = () => {
		setEditForm(true);
	};
	const hideEditForm = () => {
		setEditForm(false);
	};

	const setModalOpenHandler = () => {
		setModalStats(true);
	};
	const setModalCloseHandler = () => {
		setModalStats(false);
	};
	return (
		<>
			<ImageRow
				image={image}
				modalTitle={t("drawer.team.memberPhoto")}
				id={id}
				dispatchSave={saveTeamImage}
			/>
			{!editForm && (
				<>
					<div>
						<TextInfoRow label={t("drawer.team.firstName.label")} value={name} />
						<TextInfoRow label={t("drawer.team.lastName.label")} value={lastName} />
						<TextInfoRow label={t("drawer.team.role.label")} value={position} />
						<TextInfoRow
							label={t("drawer.team.summary.label")}
							value={summary}
							className='items-start'
						/>
					</div>
					{member.social_media.length > 0 && (
						<SocialMedia socialMedia={member.social_media} />
					)}
					<div
						className={clsx(
							"flex pt-lg",
							!addMember && showAddMember ? "justify-between" : "justify-end"
						)}
					>
						{!addMember && showAddMember && (
							<Button
								type='button'
								color='transparent'
								size='small'
								width='custom'
								className='border-2 border-solid border-form-outline'
								onClick={addMemberHandler}
							>
								{t("drawer.team.addMember")}
								<DrawerPlusIcon alt='' />
							</Button>
						)}
						<div className='flex min-w-[316px] justify-between'>
							<Button
								type='button'
								color='black'
								size='small'
								width='custom'
								onClick={showEditForm}
								className='!min-w-[150px]'
							>
								{t("drawer.button.edit")}
							</Button>
							<Button
								type='button'
								color='transparent-red'
								size='small'
								width='custom'
								onClick={setModalOpenHandler}
								className='!min-w-[150px] border-2 border-solid border-error-emphasis'
							>
								{t("drawer.team.removeMember")}
							</Button>
						</div>
					</div>
				</>
			)}
			{editForm && (
				<AddTeamMemberForm member={member} loading={loading} hideEditForm={hideEditForm} />
			)}
			<Modal
				opened={modalStatus}
				onCloseAction={setModalCloseHandler}
				closeOnDocumentClick={true}
				showCloseButton={false}
				className='w-[350px]'
			>
				<DeleteTeamMemberForm closeModalHandler={setModalCloseHandler} memberId={id} />
			</Modal>
		</>
	);
};

export default TeamMember;
