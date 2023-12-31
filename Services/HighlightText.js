import Button from "elements/Button";

import { useRouter } from "next/router";
import HighlightTextWrapper, {
	ButtonHolder,
	HighlightTextDescription,
	HighlightTextHolder,
	HighlightTextTitle
} from "./HighlightText.styles";

const HighlightText = ({ component }) => {
	const { title, description, typography, with_background: withBackground, button } = component;
	const {
		text_font_size: textFontSize,
		text_font_weight: textFontWeight,
		title: titleTypography,
		text_align: textAlign
	} = typography;

	const { text: buttonText, external_link: externalLink, url: buttonUrl } = button;

	const router = useRouter();

	const clickHandler = () => {
		router.push(buttonUrl);
	};

	return (
		component && (
			<HighlightTextWrapper withBackground={withBackground}>
				<HighlightTextHolder withBackground={withBackground}>
					<HighlightTextTitle title={titleTypography}>{title}</HighlightTextTitle>
					<HighlightTextDescription
						fontSize={textFontSize}
						fontWeight={textFontWeight}
						textAlign={textAlign}
					>
						{description}
					</HighlightTextDescription>
					{buttonText && (
						<ButtonHolder>
							{externalLink ? (
								<a href={buttonUrl} target='_blank' rel='noreferrer'>
									<Button>{buttonText}</Button>
								</a>
							) : (
								<Button onClick={clickHandler}>{buttonText}</Button>
							)}
						</ButtonHolder>
					)}
				</HighlightTextHolder>
			</HighlightTextWrapper>
		)
	);
};

export default HighlightText;
