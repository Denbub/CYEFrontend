import clsx from "clsx";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { getInitials } from "utilities";

import { getCompany } from "selectors";
import { openDrawer } from "slices";

import EditButton from "components/v2/EditButton";

const CompanyImage = ({ title, profilePage }) => {
	const logo = useSelector(state => getCompany(state)?.logo);
	const dispatch = useDispatch();

	const initials = getInitials(title);

	const onEditButton = () => {
		dispatch(openDrawer());
	};

	return (
		<div
			className={clsx(
				"hidden h-[224px] w-[224px] items-center justify-center xl:flex",
				"rounded-full border-2 border-fg-on-accent bg-fg-subtle",
				"typographyLeadRegular  relative text-fg-on-accent shadow-companyImage"
			)}
		>
			{profilePage && (
				<EditButton
					iconName='image'
					size={48}
					className='absolute left-[166px] top-[166px] z-20'
					onClick={onEditButton}
				/>
			)}
			{logo ? (
				<Image src={logo} fill className='rounded-full object-cover object-center' />
			) : (
				initials
			)}
		</div>
	);
};

export default CompanyImage;
