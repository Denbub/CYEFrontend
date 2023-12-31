import Link from "next/link";

import { routes } from "routes";

const SupportSection = () => {
	const links = [
		{ name: "FAQ", url: routes.home },
		{ name: "Hilfe", url: routes.home },
		{ name: "Feedback", url: routes.home }
	];
	return (
		<div className='hidden text-[23px] leading-6 tracking-wider xl:visible xl:block xl:pb-[80px]'>
			<h3 className=' font-bold uppercase '>Support</h3>
			<ul>
				{links.map(({ name, url }, index) => (
					<li key={`link-${index}`}>
						<Link href={url} className='typographyButtonLargeRegular text-fg-on-accent'>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SupportSection;
