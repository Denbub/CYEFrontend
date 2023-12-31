import { useEffect, useState } from "react";
import clsx from "clsx";
import { API } from "utilities/api";
import LinkBase from "next/link";

const HeaderLinksList = ({ mobileView, closeMenu }) => {
	const [links, setLinks] = useState([]);

	const fetchHeaderMenu = async () => {
		try {
			const response = await API.get("/pages/", {
				type: "wagtail_app.HomePage",
				slug: "header",
				fields: "body"
			});

			if (response?.items && response.items[0]) {
				const links = response.items[0].body.map(link => {
					const { display_name, external_link, url } = link.value;
					return {
						displayName: display_name,
						externalLink: external_link,
						url: url,
						id: link.id
					};
				});
				setLinks(links);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchHeaderMenu();
	}, []);

	if (!links.length) {
		return null;
	}

	return (
		<ul
			className={clsx(
				"flex gap-[16px]",
				mobileView ? "mb-[20px] flex-col items-end" : "items-center justify-between"
			)}
		>
			{links.map(({ displayName, externalLink, id, url }) => {
				return (
					<li key={id}>
						{externalLink ? (
							<a
								className='typographySmallRegular text-grey-500 hover:underline'
								href={url}
								target='_blank'
								onClick={closeMenu}
								rel='noreferrer'
							>
								{displayName}
							</a>
						) : (
							<LinkBase
								className='typographySmallRegular text-grey-500 hover:underline'
								href={url}
								onClick={closeMenu}
							>
								{displayName}
							</LinkBase>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default HeaderLinksList;
