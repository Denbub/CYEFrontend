import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { routes } from "routes";

import Loader from "components/Loader";

const Final = props => {
	const { t } = useTranslation();
	const router = useRouter();
	useEffect(() => {
		router.replace(`${routes.companyRegistration}?step=final`);
	}, []);
	return <Loader />;
};

export const getServerSideProps = async ({ locale, req }) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common", "cookie"]))
		}
	};
};

export default Final;
