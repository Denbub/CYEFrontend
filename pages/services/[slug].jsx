import { ContentBlocks } from "components/Services";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import { API } from "utilities/api";

const LoginPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function Service({ contentBlocks, slug }) {
	return (
		<LoginPageWrapper>
			<main>
				<ContentBlocks contentBlocks={contentBlocks} />
			</main>
		</LoginPageWrapper>
	);
}

export async function getServerSideProps(context) {
	let contentBlocks = {};

	try {
		const page = await API.get("/pages/", {
			type: "wagtail_app.HomePage",
			slug: context.query.slug,
			fields: "body"
		});

		if (page?.items[0]) {
			contentBlocks = page.items[0];
		}
	} catch (err) {
		console.log(err);
	}
	return {
		props: {
			...(await serverSideTranslations(context.locale, ["common", "cookie"])),

			contentBlocks: contentBlocks
		}
	};
}
