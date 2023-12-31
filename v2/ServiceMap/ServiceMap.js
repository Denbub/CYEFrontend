import { useSelector } from "react-redux";

import { getCompany, getServiceData } from "selectors";

import BingMap from "components/v2/BingMap";

const ServiceMap = ({ bingApiReady }) => {
	const address = useSelector(state => getCompany(state).address);
	const { radius, title } = useSelector(state => getServiceData(state));

	return (
		<BingMap
			bingApiReady={bingApiReady}
			mapClassName='xl:min-h-[441px]'
			address={address}
			radius={radius}
			serviceName={title}
		/>
	);
};

export default ServiceMap;
