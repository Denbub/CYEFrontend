import { useTranslation } from "next-i18next";

import clsx from "clsx";

const getLink = (linkType, link, linkText) => {
	switch (linkType) {
		case "link":
			return `<a class='text-white decoration-1' href='${link}' target="_blank">${linkText}</a>`;
		case "email":
			return `<a class='text-white decoration-1' href='mailto:${link}' target="_blank">${linkText}</a>`;
		default:
			"";
	}
};

const prepareAttributes = (links, t) => {
	return (
		links &&
		links.reduce((preparedLinks, { type, text, link }) => {
			return { ...preparedLinks, [type]: getLink(type, t(link), t(text)) };
		}, {})
	);
};

const Notification = ({ links, type, text }) => {
	const { t } = useTranslation();
	const attributes = prepareAttributes(links, t);

	return (
		<div
			className={clsx(
				"py-sm",
				type == "info" && "bg-orange-500",
				type == "warning" && "bg-accent-default "
			)}
		>
			<div
				className='container text-center text-white'
				dangerouslySetInnerHTML={{ __html: t(text, { ...attributes }) }}
			/>
		</div>
	);
};

export default Notification;
