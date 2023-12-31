import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import Slider from "elements/v2/Drawer/Slider";
import Button from "elements/v2/Button";

import TeamMember from "./TeamMember";
import AddTeamMemberForm from "./AddTeamMemberForm";

import DrawerPlusIcon from "icons/drawerPlus.svg";

const DrawerTeam = () => {
	const { teamMembers, loading } = useSelector(state => state.team);
	const { t } = useTranslation();
	const [addMember, setAddMember] = useState(false);

	const addMemberHandler = () => {
		setAddMember(true);
	};

	const hideEditForm = () => {
		setAddMember(false);
	};

	return (
		<Slider title={t("drawer.team.title")}>
			{!loading &&
				teamMembers.map((member, index) => (
					<div key={`teamMember${member.id}`}>
						<TeamMember
							member={member}
							loading={loading}
							addMemberHandler={addMemberHandler}
							addMember={addMember}
							showAddMember={index === teamMembers.length - 1}
						/>
						{index !== teamMembers.length - 1 && <hr className='mt-[15px]' />}
					</div>
				))}
			{!teamMembers.length && !addMember && (
				<Button
					type='button'
					color='transparent'
					size='small'
					width='custom'
					className='mt-[20px] border-2 border-solid border-form-outline'
					onClick={addMemberHandler}
				>
					{t("drawer.team.addMember")}
					<DrawerPlusIcon alt='' />
				</Button>
			)}
			{!loading && addMember && (
				<>
					<hr className='mt-[20px]' />
					<AddTeamMemberForm
						loading={loading}
						member={{ social_media: [] }}
						hideEditForm={hideEditForm}
						showCloseButton={true}
					/>
				</>
			)}
		</Slider>
	);
};

export default DrawerTeam;
