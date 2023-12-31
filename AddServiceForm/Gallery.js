import { useTranslation } from "next-i18next";

import ImageGallery from "components/ImageGallery";
import { SubTitle, Title } from "./AddServiceForm.style";

const Gallery = () => {
	const { t } = useTranslation();

	return (
		<div>
			<Title>{t("serviceAdd.gallery.title")}</Title>
			<SubTitle>{t("serviceAdd.gallery.subTitle")}</SubTitle>

			<ImageGallery />
		</div>
	);
};

export default Gallery;
