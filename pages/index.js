import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { API } from "utilities/api";

import { ContentBlocks } from "components/Services";
import BlogCarousel from "components/Services/BlogCarousel";

const Home = ({ contentBlocks, articles }) => {
	const { t } = useTranslation();

	return (
		<div>
			<Head>
				<title>{t("index.head.title")}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ContentBlocks contentBlocks={contentBlocks} />
			<BlogCarousel items={articles} title={t("index.blog.title")} />
		</div>
	);
};

export async function getServerSideProps(context) {
	let contentBlocks = {};
	let items = [];

	try {
		const page = await API.get("/pages/", {
			type: "wagtail_app.HomePage",
			slug: "main",
			fields: "body"
		});

		const articles = await API.get(`/blog/articles/`);
		items = articles.length && articles;

		if (page?.items[0]) {
			contentBlocks = page.items[0];
		}
	} catch (err) {
		console.log(err);
	}
	return {
		props: {
			...(await serverSideTranslations(context.locale, ["common", "cookie"])),
			slug: context.query.slug || "",
			contentBlocks: contentBlocks,
			articles: items
		}
	};
}

export default Home;
