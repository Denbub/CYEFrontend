import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuth } from "utilities/auth";

import CompanyRegistration from "components/CompanyRegistration";

const CompanyRegistrationPage = () => {
	return <CompanyRegistration />;
};

export const getServerSideProps = async context => {
	return withAuth(context, async () => {
		return {
			props: {
				...(await serverSideTranslations(context.locale, ["common", "cookie"]))
			}
		};
	});
};

export default CompanyRegistrationPage;
