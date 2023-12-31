import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { debounce } from "utilities";

import { updateCompany, updateService } from "slices";

import EditButton from "components/v2/EditButton";

import ChevronUp from "icons/chevronUp.svg";

import EditModal from "./EditModal";

const DESCRIPTION_LINE_HEIGHT_PX = 28.5;
const MAX_TEXT_ROWS = 9;

const ProfileDescription = ({ title, description, serviceProfile, companyProfile }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [showFullDescription, setShowFullDescription] = useState(false);
	const [amountOfTextRows, setAmountOfTextRows] = useState(0);
	const [ellipsisExisting, setEllipsisExisting] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const descriptionRef = useRef(null);

	const profilePage = serviceProfile || companyProfile;

	const onReadMore = () => {
		setShowFullDescription(value => !value);
	};

	const calculateTextRows = () => {
		if (descriptionRef.current) {
			setAmountOfTextRows(
				Math.ceil(descriptionRef.current.clientHeight / DESCRIPTION_LINE_HEIGHT_PX)
			);
		}
	};

	const resizeHandler = useCallback(
		debounce(() => {
			calculateTextRows();
		}, 300),
		[]
	);

	const onEditButton = () => {
		setShowModal(true);
	};

	const onSubmit = useCallback(
		({ title, description }) => {
			const payload = { name: title, description };
			if (serviceProfile) {
				dispatch(updateService(payload));
			} else {
				dispatch(updateCompany(payload));
			}
			setShowModal(false);
		},
		[serviceProfile]
	);

	const onModalClose = useCallback(() => {
		setShowModal(false);
	}, []);

	useEffect(() => {
		window.addEventListener("resize", resizeHandler);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [resizeHandler]);

	useEffect(() => {
		calculateTextRows();
	}, [descriptionRef.current, description]);

	useEffect(() => {
		if (amountOfTextRows > MAX_TEXT_ROWS) {
			setEllipsisExisting(true);
		} else {
			setEllipsisExisting(false);
		}
	}, [amountOfTextRows]);

	return (
		<div className='mb-md xl:mb-[56px] xl:border-b-[1px] xl:border-bg-muted xl:pb-[54px]'>
			<div className='grid grid-cols-[1fr_32px]'>
				<h5 className='typographyHeadline-5Bold mb-md text-fg-default'>{title}</h5>
				{profilePage && <EditButton onClick={onEditButton} withShadow />}
			</div>

			<div className=' relative mb-md'>
				<p
					className={clsx(
						"typographyInputLargeRegular text-fg-muted",
						!showFullDescription && "line-clamp-[9] xl:line-clamp-[14]"
					)}
					ref={descriptionRef}
				>
					{description}
				</p>
				{ellipsisExisting && (
					<div
						className={clsx(
							showFullDescription
								? "static"
								: "bg-description-gradient absolute bottom-0 h-[80px] ",
							"flex w-full items-end"
						)}
					>
						<button
							onClick={onReadMore}
							className={clsx(
								"typographyButtonLargeBold h-[36px] w-full text-accent-default",
								"flex items-center justify-center gap-[15px]"
							)}
						>
							{t(showFullDescription ? "readLess" : "readMore")}
							<ChevronUp
								className={clsx("scale-150", !showFullDescription && "rotate-180")}
							/>
						</button>
					</div>
				)}
			</div>
			{showModal && (
				<EditModal
					onClose={onModalClose}
					title={title}
					description={description}
					onSubmit={onSubmit}
				/>
			)}
		</div>
	);
};

export default ProfileDescription;
