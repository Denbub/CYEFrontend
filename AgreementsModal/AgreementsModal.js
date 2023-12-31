import Modal from "components/Modal";

import Wrapper, {
	ButtonsHolder,
	ContentHolder,
	Description,
	No,
	Yes
} from "./AgreementsModal.style";

const AgreementsModal = ({ onClose, onReject, onConfirm }) => {
	return (
		<Modal onClose={onClose}>
			<Wrapper>
				<ContentHolder>
					<Description>Are you sure you want to delete xy</Description>
					<ButtonsHolder>
						<No onClick={onReject}>No</No>
						<Yes onClick={onConfirm}>Yes</Yes>
					</ButtonsHolder>
				</ContentHolder>
			</Wrapper>
		</Modal>
	);
};

export default AgreementsModal;
