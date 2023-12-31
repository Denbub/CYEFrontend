import clsx from "clsx";

const ContentBlock = ({ icon, title, subtitle, items, bgColor }) => {
	return (
		<div className=' flex overflow-hidden rounded-lg border border-border-default shadow-shadow-theme-20 '>
			<div
				className={clsx(
					"flex w-full flex-1 items-center justify-center p-lg",
					bgColor,
					"xl:p-xxl"
				)}
			>
				{icon}
			</div>
			<div className='w-full content-center justify-center p-lg'>
				<h3 className='typographyBodyBold text-fg-default xl:typographyLeadBold'>
					{title}
				</h3>
				<p className=' typographyCaptionRegular text-fg-muted'>{subtitle}</p>
				<ul>
					{items.map((text, index) => {
						return (
							<li
								key={index}
								className={clsx(
									"before:content:'' before:absolute before:left-0 before:block before:h-1 before:w-1 before:rounded-full before:bg-current before:inset-y-center",
									"typographyCaptionRegular relative pl-sm text-fg-muted"
								)}
							>
								{text}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ContentBlock;
