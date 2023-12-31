import Container from "elements/v2/Container";

import { Description, Title } from "./Text.style";

const Text = ({ component }) => {
	const { title, description, typography } = component;
	const {
		text_font_size: textFontSize,
		text_font_weight: textFontWeight,
		title: titleTypography,
		text_align: textAlign
	} = typography;
	return (
		<Container>
			<Title title={titleTypography}>{title}</Title>
			<Description
				dangerouslySetInnerHTML={{ __html: description }}
				fontSize={textFontSize}
				fontWeight={textFontWeight}
				textAlign={textAlign}
			/>
		</Container>
	);
};

export default Text;
