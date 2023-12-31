import Container from "elements/v2/Container";
import Image from "next/image";

import Wrapper, {
	BackgroundCircle,
	BackgroundRectangle,
	Column,
	Description,
	IconsHolder,
	Name,
	NameHolder,
	Position,
	SignRow,
	StyledImage,
	Title
} from "./Publication.style";

const Publication = ({ component }) => {
	const { title, description, icons, image, name, position, sign, typography } = component;
	const {
		text_font_size: textFontSize,
		text_font_weight: textFontWeight,
		title: titleTypography,
		text_align: textAlign
	} = typography;

	return (
		<Container>
			<Wrapper>
				<Column>
					<BackgroundRectangle />
					<BackgroundCircle />
					{image && <StyledImage src={image} width='545' height='867' />}
				</Column>
				<Column>
					<Title title={titleTypography}>{title}</Title>
					<Description
						fontSize={textFontSize}
						textAlign={textAlign}
						fontWeight={textFontWeight}
					>
						{description}
					</Description>
					<SignRow>
						<NameHolder>
							<Position>{position}</Position>
							<Name>{name}</Name>
						</NameHolder>
						{sign && (
							<Image
								src={sign}
								width='140'
								height='70'
								style={{
									width: "auto"
								}}
							/>
						)}
					</SignRow>
					<IconsHolder>
						{icons.length > 0 &&
							icons.map((icon, index) => {
								return (
									<Image
										key={icon + index}
										src={icon}
										width='60'
										height='60'
										style={{
											width: "auto"
										}}
										alt='icon'
									/>
								);
							})}
					</IconsHolder>
				</Column>
			</Wrapper>
		</Container>
	);
};

export default Publication;
