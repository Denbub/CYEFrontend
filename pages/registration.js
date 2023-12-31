import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";

import { fetchFeaturesConfig } from "utilities";
import { publicPageRedirect } from "utilities/auth";

import RegistrationForm from "components/RegistrationForm";
import LogoIcon from "icons/logo.svg";
import background from "../../public/registration.jpg";

export default function Registration({ featuresConfig }) {
	const { t } = useTranslation();
	return (
		<div className='relative min-h-[calc(100vh-220px)] bg-bg-canvas'>
			<div className='py-[32px]  xl:container xl:py-[80px]'>
				<div className='xl:pr-40px  xl:w-[50%] xl:max-w-[554px]'>
					<div className='mb-lg maxXl:container'>
						<LogoIcon className='h-xl w-[55px] xl:mx-auto xl:h-[44px] xl:w-[51px]' />
					</div>

					<div className='flex flex-col gap-lg pb-lg pb-[32px] xl:gap-8'>
						<RegistrationForm />
					</div>
				</div>
			</div>
			<div className=' hidden overflow-hidden xl:absolute xl:inset-y-0 xl:right-0 xl:block xl:w-1/2'>
				<Image src={background} fill className=' object-cover object-center' />
			</div>
		</div>
	);
}

export const getServerSideProps = async context => {
	const features = await fetchFeaturesConfig();

	return publicPageRedirect(context, async () => {
		return {
			props: {
				...(await serverSideTranslations(context.locale, ["common", "cookie"])),
				featuresConfig: features
			}
		};
	});
};
