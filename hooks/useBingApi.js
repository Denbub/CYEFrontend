import { useEffect, useState } from "react";
import { loadBingApi } from "utilities";

const useBingApi = () => {
	const [bingApiReady, setBingApiReady] = useState(false);
	useEffect(() => {
		loadBingApi(() => {
			setBingApiReady(true);
		});
	}, []);

	return {
		bingApiReady
	};
};

export default useBingApi;
