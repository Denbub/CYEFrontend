import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { API } from "utilities/api";

import { ContentBlocks } from "components/Services";
import { routes } from "routes";

const DynamicPage = ({ contentBlocks }) => {
	const { t } = useTranslation();
	return (
		<div>
			<Head>
				<title>{t("index.head.title")}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ContentBlocks contentBlocks={contentBlocks} />
		</div>
	);
};

export async function getServerSideProps(context) {
	const slugs = context?.params?.slug;
	const notFoundRedirect = {
		redirect: {
			destination: routes.notFound,
			permanent: false
		}
	};
	let contentBlocks = {};

	try {
		const page = await API.get("/pages/", {
			type: "wagtail_app.HomePage",
			slug: slugs[slugs.length - 1],
			fields: "body"
		});
		if (page?.items[0]) {
			contentBlocks = page.items[0];
		}
	} catch (err) {
		return notFoundRedirect;
	}

	if (!Object.keys(contentBlocks).length) {
		return notFoundRedirect;
	}

	return {
		props: {
			...(await serverSideTranslations(context.locale, ["common", "cookie"])),
			contentBlocks
		}
	};
}

export default DynamicPage;
