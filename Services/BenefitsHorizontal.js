import Container from "elements/v2/Container";

import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { screenSizes } from "constant";

import { NextButton, PrevButton } from "elements/NavigationElements";
import usePageWidth from "hooks/usePageWidth";

import {
	Description,
	ExternalLink,
	IconHolder,
	ItemDescription,
	Link,
	LinkHolder,
	List,
	ListItem,
	NavigationHolder,
	Row,
	StyledImage,
	SwiperHolder,
	Title
} from "./BenefitsHorizontal.style";

const SwiperNavigation = () => {
	const swiper = useSwiper();
	return (
		<NavigationHolder>
			<PrevButton onClick={() => swiper.slidePrev()} />
			<NextButton onClick={() => swiper.slideNext()} />
		</NavigationHolder>
	);
};

const BenefitsHorizontalItem = ({ description, icon }) => {
	return (
		<ListItem>
			{icon && (
				<IconHolder>
					<StyledImage
						src={icon}
						alt='benefits icon'
						width={46}
						height={46}
						style={{
							width: "auto",
							height: "auto"
						}}
					/>
				</IconHolder>
			)}
			<ItemDescription>{description}</ItemDescription>
		</ListItem>
	);
};

const BenefitsHorizontal = ({ component }) => {
	const { title, description, benefits, button } = component;
	const [swiperVisibility, setSwiperVisibility] = useState(false);
	const [__isMobile, setIsMobile] = useState(null);

	const pageWidth = usePageWidth();

	useEffect(() => {
		setIsMobile(isMobile);
	}, []);

	useEffect(() => {
		if (benefits.length > 1 && (pageWidth < screenSizes.TABLET || __isMobile)) {
			setSwiperVisibility(true);
		} else {
			setSwiperVisibility(false);
		}
	}, [pageWidth, benefits?.length, __isMobile]);

	return (
		<Container>
			<Row>
				<Title>{title}</Title>
				{description && <Description>{description}</Description>}
			</Row>
			{benefits && swiperVisibility ? (
				<SwiperHolder>
					<Swiper slidesPerView={1}>
						{benefits.map(({ description, icon }) => {
							return (
								<SwiperSlide key={description}>
									<BenefitsHorizontalItem description={description} icon={icon} />
								</SwiperSlide>
							);
						})}
						<SwiperNavigation />
					</Swiper>
				</SwiperHolder>
			) : null}

			{benefits && !swiperVisibility ? (
				<List>
					{benefits.map(({ description, icon, id }) => (
						<BenefitsHorizontalItem key={id} description={description} icon={icon} />
					))}
				</List>
			) : null}
			{button && button.url && (
				<LinkHolder>
					{button.external_link ? (
						<ExternalLink href={button.url} target='_blank'>
							{button.text}
						</ExternalLink>
					) : (
						<Link href={button.url}>{button.text}</Link>
					)}
				</LinkHolder>
			)}
		</Container>
	);
};

export default BenefitsHorizontal;
