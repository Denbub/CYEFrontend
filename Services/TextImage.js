import Container from "elements/v2/Container";
import {
	ContentHolder,
	ExternalLink,
	Image,
	Link,
	LinkHolder,
	Text,
	TextBlockHolder,
	Title
} from "./TextImage.styles";

const CustomLink = ({ href, externalLink, name }) => {
	return (
		<LinkHolder>
			{externalLink ? (
				<ExternalLink href={href} target='_blank' rel='noreferrer'>
					{name}
				</ExternalLink>
			) : (
				<Link href={href}>{name}</Link>
			)}
		</LinkHolder>
	);
};

const TextImage = ({ component }) => {
	const { title, elements_list: elementsList, typography } = component;
	const {
		text_font_size: textFontSize,
		text_font_weight: textFontWeight,
		title: titleTypography,
		text_align: textAlign
	} = typography;

	return (
		<Container>
			{title && <Title title={titleTypography}>{title}</Title>}
			<ContentHolder oneChild={elementsList.length === 1}>
				{elementsList.map(({ id, type, value }) => {
					if (type === "image") {
						return (
							<Image
								key={id}
								src={value.image}
								alt='image'
								width={value.width || 100}
								height={100}
								style={{
									width: "auto",
									height: "auto"
								}}
								imagewidth={value.width}
							/>
						);
					}

					if (type === "text_button") {
						return (
							<TextBlockHolder key={id}>
								{value.text && (
									<Text
										fontSize={textFontSize}
										textAlign={textAlign}
										fontWeight={textFontWeight}
									>
										{value.text}
									</Text>
								)}
								{value.button.text && (
									<CustomLink
										href={value.button.url}
										externalLink={value.button.external_link}
										name={value.button.text}
										key={id}
									/>
								)}
							</TextBlockHolder>
						);
					}

					return null;
				})}
			</ContentHolder>
		</Container>
	);
};

export default TextImage;
