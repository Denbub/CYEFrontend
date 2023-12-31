import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { routes } from "routes";

import Image, { Button, Container, Text } from "elements/404";

const NotFoundPage = () => {
	const { t } = useTranslation();
	const router = useRouter();

	const onButtonClick = () => {
		router.replace(routes.home);
	};

	return (
		<Container>
			<Image />
			<Text>{t("404.text")}</Text>
			<Button onClick={onButtonClick}>{t("404.button")}</Button>
		</Container>
	);
};

export const getStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "cookie"]))
		}
	};
};

export default NotFoundPage;
