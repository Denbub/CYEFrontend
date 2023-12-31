import { createElement } from "react";

import Benefits from "./Benefits";
import BenefitsHorizontal from "./BenefitsHorizontal";
import BlogCarousel from "./BlogCarousel";
import Button from "./Button";
import FAQ from "./FAQ";
import Header from "./Header";
import HighlightText from "./HighlightText";
import ImageGallery from "./ImageGallery";
import Offer from "./Offer";
import Publication from "./Publication";
import RichText from "./RichText";
import Text from "./Text";
import TextImage from "./TextImage";

import ContentWrapper from "./ContentBlocks.style";

const ContentBlocks = ({ contentBlocks }) => {
	const components = Object.freeze({
		header: Header,
		highlight_text: HighlightText,
		benefits_vertical: Benefits,
		benefits_horizontal: BenefitsHorizontal,
		benefits_slider_vertical: Offer,
		FAQ: FAQ,
		text_image: TextImage,
		publication: Publication,
		text: Text,
		blogCarousel: BlogCarousel,
		button: Button,
		imageGallery: ImageGallery,
		rich_text: RichText,
		raw_html: RichText
	});

	return (
		<ContentWrapper>
			{contentBlocks.body?.map((component, index) => {
				if (
					!Object.prototype.hasOwnProperty.call(components, component.type) ||
					!component.value
				) {
					console.log("component not found", component.type);
					return null;
				}

				return createElement(
					components[component.type],
					{ component: component.value, key: component.type + index },
					null
				);
			})}
		</ContentWrapper>
	);
};

export default ContentBlocks;
