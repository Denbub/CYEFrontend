import clsx from "clsx";
import { useTranslation } from "next-i18next";

import EditIcon from "icons/edit.svg";

const InfoTableItem = ({ label, value, profilePage, children, onEdit, capacityItem }) => {
	const { t } = useTranslation();

	return (
		<li className='border-b-[1px] border-bg-muted py-[12px] first:pt-0 last:border-b-0 last:pb-0'>
			<div className='flex items-center justify-between'>
				<div
					className={clsx(
						"flex items-baseline justify-between",
						capacityItem && "flex-col"
					)}
				>
					<span className=' typographySmallBold mr-[6px] text-fg-muted'>{label}</span>
					<span className=' typographyInputLargeRegular text-fg-default'>{value}</span>
				</div>
				{profilePage && (
					<div className='flex flex-1 justify-end'>
						<button
							onClick={onEdit}
							className=' typographyButtonNormalBold flex items-center text-accent-default'
						>
							<span className='mr-sm'>{t("service.configurationForm.edit")}</span>
							<EditIcon />
						</button>
					</div>
				)}
			</div>

			{children}
		</li>
	);
};

export default InfoTableItem;
