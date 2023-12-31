import clsx from "clsx";

const Language = ({ white }) => (
	<a
		className={clsx(
			white ? "text-white" : "text-fg-default",
			"typographySmallRegular cursor-pointer"
		)}
	>
		DE
	</a>
);

export default Language;
