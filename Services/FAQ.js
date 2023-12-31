import Container from "elements/v2/Container";
import { useState } from "react";
import {
	FAQItem,
	FAQItemDescription,
	FAQItemTitle,
	FAQTitle,
	FAQWrapper,
	IconPlus
} from "./FAQ.styles";

const FAQ = ({ component }) => {
	const { title, questions, typography } = component;
	const {
		text_font_size: textFontSize,
		text_font_weight: textFontWeight,
		title: titleTypography
	} = typography;

	// eslint-disable-next-line no-undef
	const [active, setActive] = useState(new Set());

	const clickHandler = id => () => {
		// eslint-disable-next-line no-undef
		const items = new Set(active);

		if (items.has(id)) {
			items.delete(id);
		} else {
			items.add(id);
		}
		setActive(items);
	};

	return questions.length ? (
		<Container>
			<FAQWrapper>
				{title && <FAQTitle title={titleTypography}>{title}</FAQTitle>}
				<div>
					{questions.map(({ answer, question }, index) => (
						<FAQItem key={index} onClick={clickHandler(index)}>
							<FAQItemTitle fontSize={textFontSize} fontWeight={textFontWeight}>
								{question}
								<IconPlus active={active.has(index)} />
							</FAQItemTitle>
							<FAQItemDescription
								active={active.has(index)}
								fontSize={textFontSize}
								fontWeight={textFontWeight}
							>
								{answer}
							</FAQItemDescription>
						</FAQItem>
					))}
				</div>
			</FAQWrapper>
		</Container>
	) : null;
};

export default FAQ;
