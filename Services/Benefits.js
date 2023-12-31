import NextImage from "next/image";
import { useState } from "react";

import Container from "elements/v2/Container";

import {
	BenefitDescription,
	BenefitIcon,
	BenefitsItem,
	BenefitsTitle,
	BenefitsWrapper,
	BenefitTitle
} from "./Benefits.styles";

const Benefits = ({ component }) => {
	const { title, benefits, typography, closed } = component;
	const {
		text_font_size: textFontSize,
		text_font_weight: textFontWeight,
		title: titleTypography
	} = typography;

	const [active, setActive] = useState(!closed ? "" : 0);
	const clickHandler = id => () => {
		setActive(active => (active !== id ? id : ""));
	};

	return benefits.length ? (
		<Container>
			<BenefitsWrapper>
				{title && <BenefitsTitle title={titleTypography}>{title}</BenefitsTitle>}
				<div>
					{benefits.map(({ icon, description, title }, index) => (
						<BenefitsItem key={index} onClick={clickHandler(index)}>
							{active === index && icon && (
								<BenefitIcon>
									<NextImage src={icon} alt={title} width='60' height='60' />
								</BenefitIcon>
							)}
							<BenefitTitle>{title}</BenefitTitle>
							<BenefitDescription
								active={active === index}
								fontSize={textFontSize}
								fontWeight={textFontWeight}
							>
								{description}
							</BenefitDescription>
						</BenefitsItem>
					))}
				</div>
			</BenefitsWrapper>
		</Container>
	) : (
		""
	);
};

export default Benefits;
