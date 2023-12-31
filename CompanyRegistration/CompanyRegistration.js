import { useState, useEffect } from "react";
import Loader from "components/Loader";
import ProgressBar from "components/ProgressBar/ProgressBar";

import clsx from "clsx";
import Final from "./Final";
import FirstStep from "./FirstStep";
import Onboarding from "./Onboarding";
import SecondStep from "./SecondStep";
import SupportSection from "./SupportSection";
import useCompanyRegistration, { steps } from "./useCompanyRegistration";
import { isMobile } from "react-device-detect";

const ActiveStep = ({
	activeStep,
	url,
	status,
	companyId,
	t,
	nextClickHandler,
	backClickHandler,
	formik
}) => {
	switch (activeStep) {
		case 0:
			return <FirstStep {...{ nextClickHandler, backClickHandler, t, formik }} />;
		case 1:
			return <SecondStep t={t} {...{ nextClickHandler, backClickHandler, t, formik }} />;
		case 2:
			return <Onboarding url={url} />;
		case 3:
			return <Final status={status} companyId={companyId} />;
	}
};

const CompanyRegistration = () => {
	const {
		processing,
		id,
		url,
		status,
		nextClickHandler,
		backClickHandler,
		activeStep,
		formik,
		t,
		text
	} = useCompanyRegistration();

	const [__isMobile, setIsMobile] = useState(null);

	useEffect(() => {
		setIsMobile(isMobile);
	}, []);

	return (
		<div className='relative h-full'>
			<div
				className={clsx(
					"hidden",
					"xl:bg-accent-emphasis-gradient xl:visible xl:absolute xl:right-1/2 xl:z-[-1] xl:block xl:h-full xl:min-h-screen xl:w-screen"
				)}
			></div>
			<div
				className={clsx(
					"xl:container xl:flex xl:justify-between",
					!__isMobile && "-mt-headerDesktop pt-headerDesktop"
				)}
			>
				<div
					className={clsx(
						" text-fg-on-accent ",
						"flex-1 xl:flex xl:min-h-screen xl:max-w-[545px] xl:flex-col xl:justify-between"
					)}
				>
					<div
						className={clsx(
							"bg-accent-emphasis-gradient min-h-[174px] px-lg",
							"pb-[40px] xl:bg-none xl:px-0 xl:pt-[188px]",
							__isMobile
								? "-mt-headerMobile pt-headerMobile"
								: "-mt-headerDesktop pt-headerDesktop"
						)}
					>
						<p className='typographyInputLargeRegular mb-md xl:typographyHeadline-3Regular xl:mb-lg '>
							{text.title}
						</p>
						<p className=' typographySmallRegular xl:typographyLeadRegular'>
							{text.subTitle}
						</p>
						{text.caption && <p className=' typographyCaptionBold'>{text.caption}</p>}
					</div>
					<SupportSection />
				</div>
				<div className='xl:w-1/2 xl:pt-[40px]'>
					<div className='h-full  xl:mx-auto xl:max-w-[616px]  xl:pl-[56px]'>
						{activeStep <= steps.secondStep && (
							<ProgressBar
								steps={2}
								currentStep={activeStep + 1}
								className='mb-[32px] xl:mb-[104px]'
							/>
						)}
						<div className='xl:min-h-auto relative min-h-[500px] px-lg xl:px-0 '>
							{processing ? (
								<Loader />
							) : (
								<ActiveStep
									{...{
										activeStep,
										url,
										status,
										companyId: id,
										t,
										nextClickHandler,
										backClickHandler,
										formik
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyRegistration;
