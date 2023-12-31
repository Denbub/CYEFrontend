import { directions } from "constant";
import Container from "elements/v2/Container";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { SwiperSlide } from "swiper/react";
import Swiper from "../Swiper";
import Navigation from "./Navigation";
import { OfferDescription, OfferImage, OfferItem, OfferWrapper } from "./Offer.styles";

const Offer = ({ component }) => {
	const { text_font_size: textFontSize, text_font_weight: textFontWeight } = component.typography;
	const [__isMobile, setIsMobile] = useState();

	useEffect(() => {
		setIsMobile(isMobile);
	}, []);
	return component.benefits ? (
		<Container>
			<OfferWrapper>
				<Swiper
					showsPagination={false}
					direction={__isMobile ? directions.horizontal : directions.vertical}
				>
					{component.benefits.map(({ description, image }, index) => (
						<SwiperSlide key={`offer-${index}`}>
							<OfferItem>
								<OfferDescription
									fontSize={textFontSize}
									fontWeight={textFontWeight}
								>
									{description}
								</OfferDescription>
								<OfferImage>
									{image && <NextImage src={image} width='980' height='247' />}
								</OfferImage>
							</OfferItem>
						</SwiperSlide>
					))}

					{component.benefits.length > 1 && (
						<Navigation
							direction={__isMobile ? directions.horizontal : directions.vertical}
						/>
					)}
				</Swiper>
			</OfferWrapper>
		</Container>
	) : null;
};

export default Offer;
