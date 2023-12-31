import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";

import CloseIcon from "icons/close.svg";

import { CloseButton, ContentHolder, Overlay } from "./Modal.style";

const Modal = ({ showModal = true, onClose, children, overlay = true }) => {
	const [isBrowser, setIsBrowser] = useState(false);
	const overlayRef = useRef(null);

	useEffect(() => {
		setIsBrowser(true);
		disableBodyScroll(overlayRef);
		return clearAllBodyScrollLocks;
	}, []);

	const modalContent = showModal ? (
		<>
			{overlay && <Overlay onClick={onClose} ref={overlayRef} />}
			<ContentHolder>
				<CloseButton onClick={onClose}>
					<CloseIcon />
				</CloseButton>
				{children}
			</ContentHolder>
		</>
	) : null;

	if (isBrowser) {
		return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
	} else {
		return null;
	}
};

export default Modal;
