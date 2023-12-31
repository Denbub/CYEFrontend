import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import { API } from "utilities/api";

import { ContentBlocks } from "components/Services";
import BlogCarousel from "components/Services/BlogCarousel";
import Button from "elements/v2/Button";

export default function Blog({ contentBlocks, previous, next, articles }) {
	const { t } = useTranslation();
	return (
		<div className='flex flex-col'>
			<main>
				<ContentBlocks contentBlocks={contentBlocks} />
				<div className='container mb-[60px]'>
					<div className='flex justify-between gap-md'>
						{previous && (
							<Link href={previous} className='w-[50%]'>
								<Button
									className='typographyButtonNormalBold gap-[6px] xl:typographyButtonXLargeBold xl:gap-[12px]'
									hasArrowLeft
									color='black'
									text={t("blog.button.previous")}
								/>
							</Link>
						)}
						{next && (
							<Link href={next} className='w-[50%]'>
								<Button
									className='typographyButtonNormalBold gap-[6px] gap-[6px] xl:typographyButtonXLargeBold xl:gap-[12px]'
									hasArrowRight
									color='black'
									text={t("blog.button.next")}
								/>
							</Link>
						)}
					</div>
				</div>
				<BlogCarousel title={t("blog.title")} items={articles} />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	let contentBlocks = {};
	let previous = null;
	let next = null;
	let items = [];
	const slug = context.query.slug;
	try {
		const page = await API.get(`/blog/articles/${slug}`);
		const articles = await API.get(`/blog/articles/`);

		const articlesLength = articles.length;

		if (articlesLength) {
			const current = articles.findIndex(article => article.slug === slug);
			if (current != "-1") {
				previous = articles[(current + articlesLength - 1) % articlesLength].slug;
				next = articles[(current + 1) % articlesLength].slug;
			}
			items = articles.filter(article => article.slug != slug);
		}

		if (page) {
			contentBlocks = page;
		}
	} catch (err) {
		console.log(err);
	}
	return {
		props: {
			...(await serverSideTranslations(context.locale, ["common", "cookie"])),
			slug: context.query.slug || "",
			contentBlocks: contentBlocks,
			articles: items,
			previous,
			next
		}
	};
}
