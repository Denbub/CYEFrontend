import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withAuth } from "utilities/auth";

import AddServiceForm from "components/AddServiceForm";

const AddServicePage = props => {
	return <AddServiceForm />;
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

export default AddServicePage;
