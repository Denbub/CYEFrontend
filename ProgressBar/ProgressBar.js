import clsx from "clsx";
import { useTranslation } from "next-i18next";

const ProgressBar = ({ steps, currentStep, className }) => {
	const { t } = useTranslation();
	const progress = Math.round((currentStep / steps) * 100);
	return (
		<>
			<div className=' typographyCaptionRegular mb-sm hidden text-fg-muted xl:visible xl:block'>
				{t("progress")}
			</div>
			<div className='w-full  bg-bg-subtle xl:rounded-[12px]'>
				<div
					className={clsx(
						" h-md bg-accent-default xl:rounded-[12px]",
						progress !== 100 && "rounded-tr-full  rounded-br-full ",
						className
					)}
					style={{ width: `${progress}%` }}
				></div>
			</div>
		</>
	);
};

export default ProgressBar;
