import clsx from "clsx";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

const Modal = ({
	opened = false,
	onOpenAction,
	onCloseAction,
	children,
	closeOnDocumentClick = false,
	showCloseButton = false,
	className
}) => {
	const [mounted, setMounted] = useState(null);

	const closeModal = () => {
		closeOnDocumentClick && onCloseAction && onCloseAction();
	};

	useEffect(() => {
		if (opened) {
			onOpenAction && onOpenAction();
		} else {
			onCloseAction && onCloseAction();
		}
	}, [opened]);

	useEffect(() => {
		setMounted(true);
	}, []);

	const modalContent = opened ? (
		<>
			<div
				className='fixed left-0 right-0 top-0 bottom-0 z-[1000] h-[100vh] w-[100vw] bg-grey-950/30'
				onClick={closeModal}
			></div>
			<div
				className={clsx(
					className,
					"fixed z-[1001] origin-center rounded-[10px] bg-white p-[24px] shadow-modal inset-center"
				)}
			>
				{children}
				{showCloseButton && (
					<div
						className={clsx(
							"absolute top-[-10px] right-[-10px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[99px] bg-white p-sm",
							" shadow-lg shadow-black/20 transition delay-100 hover:shadow-black/30"
						)}
					>
						<span className='h-[28px]' onClick={onCloseAction}>
							&times;
						</span>
					</div>
				)}
			</div>
		</>
	) : null;
	return mounted
		? ReactDOM.createPortal(modalContent, document.getElementById("modal-root"))
		: null;
};

export default Modal;
