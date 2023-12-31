import Button from "elements/v2/Button";
import NextLink from "next/link";

import clsx from "clsx";

import Container from "elements/v2/Container";

const ButtonContainer = ({ component }) => {
	const { url, text, externa_link: externalLink, position } = component;
	return (
		<Container>
			<div
				className={clsx("flex items-center", {
					"justify-center ": position === "center",
					"justify-end": position === "right",
					"justify-start ": position === "left"
				})}
			>
				{externalLink ? (
					<a href={url} target='_blank' rel='noreferrer'>
						<Button width='auto' className='px-[20px]'>
							{text}{" "}
						</Button>
					</a>
				) : (
					<NextLink href={url}>
						<Button width='auto' className='px-[20px]'>
							{text}{" "}
						</Button>
					</NextLink>
				)}
			</div>
		</Container>
	);
};

export default ButtonContainer;
