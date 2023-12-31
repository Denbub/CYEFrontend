import { clsx } from "clsx";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearDocuments, fetchDocuments } from "slices";

import ReportLink from "components/v2/ReportLink";

const DocumentLink = ({ name, documentLink }) => {
	const textStyles = "typographyButtonNormalBold text-fg-muted";
	return (
		<li
			className={clsx(
				"border-border-default py-[6px] even:border-l-[1px] even:pl-sm",
				"xl:border-l-[1px] xl:py-0 xl:pl-sm xl:first:border-0",
				textStyles
			)}
		>
			{documentLink ? (
				<a href={documentLink} target='_blank' rel='noreferrer' className={textStyles}>
					{name}
				</a>
			) : (
				name
			)}
		</li>
	);
};

const ServicePrivacySection = ({ companyId, profilePage, onReportLinkClick }) => {
	const { documents } = useSelector(state => state.documents);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		if (companyId) {
			dispatch(fetchDocuments(companyId));
		}

		return () => {
			dispatch(clearDocuments());
		};
	}, [companyId]);

	return (
		<div className='container  border-t-[1px] border-fg-muted pt-[14px]'>
			{!profilePage && (
				<ReportLink className='xl:hidden' onReportLinkClick={onReportLinkClick} />
			)}
			<ul className={clsx(" mx-auto grid grid-cols-2 gap-x-sm ", "xl:flex xl:justify-end")}>
				<DocumentLink
					name={t("drawer.documents.dataProtect.label")}
					documentLink={documents.dataProtect?.url}
				/>
				<DocumentLink
					name={t("drawer.documents.imprint.label")}
					documentLink={documents.imprint?.url}
				/>
				<DocumentLink
					name={t("drawer.documents.rightToObject.label")}
					documentLink={documents.rightToObject?.url}
				/>
				<DocumentLink name={t("drawer.documents.AGB.label")} />
			</ul>
		</div>
	);
};

export default ServicePrivacySection;
