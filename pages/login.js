import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";

import clsx from "clsx";

import { fetchFeaturesConfig } from "utilities";
import { publicPageRedirect } from "utilities/auth";

import LoginForm from "components/LoginForm";

import LogoIcon from "icons/logo.svg";
import background from "../../public/login_background.jpg";

export default function Login({ featuresConfig }) {
	return (
		<div className='relative min-h-[calc(100vh-220px)]'>
			<div className='container py-[32px] xl:py-[122px]'>
				<div className='xl:pr-40px xl:w-[50%] xl:max-w-[554px]'>
					<div className='mb-lg '>
						<LogoIcon className='h-xl w-[55px] xl:mx-auto xl:h-[44px] xl:w-[51px]' />
					</div>

					<div className={clsx("t flex flex-col gap-lg pb-lg", "pb-[32px] xl:gap-8")}>
						<LoginForm />
					</div>
				</div>
			</div>
			<div className=' hidden overflow-hidden xl:absolute xl:inset-y-0 xl:right-0 xl:block xl:w-1/2'>
				<Image src={background} fill className=' object-cover object-center' alt='login' />
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
