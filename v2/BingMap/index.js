import dynamic from "next/dynamic";

const BingMap = dynamic(() => import("./BingMap"), {
	ssr: false
});

export default BingMap;
