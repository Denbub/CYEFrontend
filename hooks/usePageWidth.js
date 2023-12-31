import { useCallback, useEffect, useState } from "react";

import { debounce } from "utilities";

const usePageWidth = () => {
	const [pageWidth, setPageWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	const resizeHandler = useCallback(
		debounce(() => {
			setPageWidth(window.innerWidth);
		}, 300),
		[]
	);

	useEffect(() => {
		window.addEventListener("resize", resizeHandler);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [resizeHandler]);

	return pageWidth;
};

export default usePageWidth;
