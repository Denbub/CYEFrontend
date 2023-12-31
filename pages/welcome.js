import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";

import { routes } from "routes";
import { withAuth } from "utilities/auth";

import EventIcon from "icons/event.svg";
import LogoIcon from "icons/logo.svg";
import MicIcon from "icons/mic.svg";

import ContentBlock from "components/ContentBlock";

import background from "../../public/welcome.webp";

const iconClassName = "h-lg w-lg xl:h-[40px] xl:w-[40px]";

const Welcome = () => {
	const { t } = useTranslation();

	return (
		<div className='relative min-h-[calc(100vh-220px)]'>
			<div className='container py-[32px] xl:py-[122px]'>
				<div className='xl:pr-40px xl:w-[50%] xl:max-w-[608px]'>
					<div className='mb-lg '>
						<LogoIcon className=' mx-auto h-xl w-[55px] xl:h-[44px] xl:w-[51px]' />
					</div>
					<h2
						className={clsx(
							"typographyHeadline-3Bold mb-xxl text-center",
							"mb-10 xl:typographyHeadline-2Bold"
						)}
					>
						{t("welcomeForm.title")}
					</h2>
					<div
						className={clsx(
							"flex flex-col gap-lg  border-b border-border-default pb-lg",
							"pb-[32px] xl:gap-8"
						)}
					>
						<ContentBlock
							icon={<EventIcon className={iconClassName} />}
							title={t("welcomeForm.eventButton.title")}
							subtitle={t("welcomeForm.eventButton.subtitle")}
							items={[
								t("welcomeForm.eventButton.item1"),
								t("welcomeForm.eventButton.item2")
							]}
							bgColor='bg-grey-950'
						/>
						<Link href={routes.companyRegistration}>
							<ContentBlock
								icon={<MicIcon className={iconClassName} />}
								title={t("welcomeForm.serviceButton.title")}
								subtitle={t("welcomeForm.serviceButton.subtitle")}
								items={[
									t("welcomeForm.serviceButton.item1"),
									t("welcomeForm.serviceButton.item2")
								]}
								bgColor='bg-accent-default'
							/>
						</Link>
					</div>
					<p className=' typographySmallRegular py-lg text-center text-fg-muted xl:py-[32px]'>
						{t("welcomeForm.description")}
					</p>
				</div>
			</div>
			<div className=' hidden overflow-hidden xl:absolute xl:inset-y-0 xl:right-0 xl:block xl:w-1/2'>
				<Image src={background} fill className=' object-cover object-center' />
			</div>
		</div>
	);
};

export const getServerSideProps = async context => {
	return withAuth(context, async () => {
		return {
			props: {
				...(await serverSideTranslations(context.locale, ["common", "cookie"]))
			}
		};
	});
};

export default Welcome;
