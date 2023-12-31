import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";

import { deleteTeamMember } from "slices";

import Button from "elements/v2/Button";

const DeleteTeamMemberForm = ({ closeModalHandler, memberId }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const deleteTeamMemberHandler = () => {
		dispatch(deleteTeamMember(memberId));
		closeModalHandler();
	};
	return (
		<>
			<h5 className='typographyHeadline-5Bold pb-sm'>
				{t("drawer.team.modal.removeMemberHeader")}
			</h5>
			<div className='typographySmallRegular pb-lg text-fg-subtle'>
				{t("drawer.team.modal.removeMemberDescription")}
			</div>
			<div className='flex justify-end'>
				<Button
					type='button'
					color='transparent'
					width='custom'
					className='!typographyButtonNormalBold mr-sm h-[32px] !min-w-[89px]'
					size='small'
					onClick={closeModalHandler}
				>
					{t("drawer.button.abort")}
				</Button>
				<Button
					type='button'
					color='default'
					size='small'
					width='custom'
					className='typographyButtonNormalBold h-[32px] !min-w-[89px]'
					onClick={deleteTeamMemberHandler}
				>
					{t("drawer.team.removeMember")}
				</Button>
			</div>
		</>
	);
};

export default DeleteTeamMemberForm;
