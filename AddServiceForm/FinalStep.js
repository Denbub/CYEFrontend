import { useTranslation } from "next-i18next";

import { FinalWrapper, Title } from "./AddServiceForm.style";

const FinalStep = () => {
	const { t } = useTranslation();

	return (
		<FinalWrapper>
			<Title>{t("serviceAdd.final.title")}</Title>
			<p>{t("serviceAdd.final.description")}</p>
		</FinalWrapper>
	);
};

export default FinalStep;
