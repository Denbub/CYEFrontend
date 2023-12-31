import clsx from "clsx";
import { useTranslation } from "next-i18next";

import FlagIcon from "icons/flag.svg";

const ReportLink = ({ className, onReportLinkClick }) => {
	const { t } = useTranslation();

	return (
		<div
			className={clsx(
				"typographyButtonNormalBold  mb-sm text-center text-fg-muted",
				"flex cursor-pointer items-center justify-center py-[10px]",
				className
			)}
			onClick={onReportLinkClick}
		>
			<FlagIcon className='mr-[10px]' />
			{t("report.title")}
		</div>
	);
};

export default ReportLink;
