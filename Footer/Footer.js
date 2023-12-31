import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { routes } from "routes";
import { API } from "utilities/api";

import Logo from "components/Logo";
import Container from "elements/v2/Container";

import FooterWrapper, {
	ContentHolder,
	Copyright,
	CopyrightSection,
	Description,
	FirstRow,
	FooterMenuLinks,
	IconsHolder,
	LogoHolder,
	MainSection,
	SocialMediaList,
	Title
} from "./Footer.style";

const IconLink = ({ height, width, alt, data }) => {
	const imageProps = {
		src: data.icon,
		height,
		width,
		alt,
		style: {
			width: "auto",
			maxHeight: height + "px",
			maxWidth: width + "px"
		}
	};
	const externalLink = data.external_link;
	const url = data.url;

	if (externalLink) {
		return (
			<a href={url} target='_blank' rel='noreferrer'>
				<Image {...imageProps} />
			</a>
		);
	}

	return (
		<Link href={url}>
			<Image {...imageProps} />
		</Link>
	);
};

const Footer = () => {
	const { t } = useTranslation();
	const [description, setDescription] = useState("");
	const [socialMediaIcons, setSocialMediaIcons] = useState([]);
	const [linksSections, setLinksSections] = useState([]);
	const [paymentIcons, setPaymentIcons] = useState([]);
	const [__isMobile, setIsMobile] = useState(null);

	const router = useRouter();

	const fetchFooterMenu = async () => {
		try {
			const response = await API.get("/pages/", {
				type: "wagtail_app.HomePage",
				slug: "footer",
				fields: "body"
			});
			const sections = response.items[0]?.body;
			if (sections) {
				const socialMediaIconsSection = sections.find(
					section => section.value.type === "socialMediaIcons"
				);
				const linksSections = sections.filter(
					section => section.value.type === "linksList"
				);
				const paymentIcons = sections.find(section => section.value.type === "paymentIcons")
					?.value.elements_list;

				const description = socialMediaIconsSection?.value.description;
				const socialMediaIcons = socialMediaIconsSection?.value.elements_list;

				description && setDescription(description);
				socialMediaIcons && setSocialMediaIcons(socialMediaIcons);
				linksSections && setLinksSections(linksSections);
				paymentIcons && setPaymentIcons(paymentIcons);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchFooterMenu();
		setIsMobile(isMobile);
	}, []);

	if (router.pathname === routes.companyRegistration && !__isMobile) {
		return null;
	}

	return (
		<FooterWrapper>
			<Container>
				<ContentHolder>
					<FirstRow>
						<LogoHolder>
							<Logo white />
						</LogoHolder>
						{description && <Description>{description}</Description>}
						{!!socialMediaIcons.length && (
							<SocialMediaList>
								{socialMediaIcons.map(({ id, value }) => {
									return (
										<li key={id}>
											<IconLink
												data={value}
												height='20'
												width='20'
												alt='social media'
											/>
										</li>
									);
								})}
							</SocialMediaList>
						)}
					</FirstRow>
					<MainSection>
						{!!linksSections.length &&
							linksSections.map(({ id, value }) => {
								const links = value.elements_list;
								const title = value.title;
								return (
									<li key={id}>
										<Title>{title}</Title>
										<FooterMenuLinks>
											{!!links.length &&
												links.map(({ id, value }) => {
													const displayName = value.display_name;
													const url = value.url;
													const externalLink = value.external_link;

													return (
														<li key={id}>
															{externalLink ? (
																<a
																	href={url}
																	target='_blank'
																	rel='noreferrer'
																>
																	{displayName}
																</a>
															) : (
																<Link href={url}>
																	{displayName}
																</Link>
															)}
														</li>
													);
												})}
										</FooterMenuLinks>
									</li>
								);
							})}
					</MainSection>
				</ContentHolder>
				<CopyrightSection>
					<Copyright>{t("footer.copyrights")}</Copyright>
					{!!paymentIcons.length && (
						<IconsHolder>
							{paymentIcons.map(({ id, value }) => {
								return (
									<li key={id}>
										<IconLink
											data={value}
											alt='payment system'
											height='18'
											width='25'
										/>
									</li>
								);
							})}
						</IconsHolder>
					)}
				</CopyrightSection>
			</Container>
		</FooterWrapper>
	);
};

export default Footer;
