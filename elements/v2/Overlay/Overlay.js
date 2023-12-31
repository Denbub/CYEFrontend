import clsx from "clsx";

const Overlay = ({ className }) => {
	return <div className={clsx("absolute inset-0 bg-fg-default opacity-5", className)} />;
};

export default Overlay;
