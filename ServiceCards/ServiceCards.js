import clsx from "clsx";
import { useSelector } from "react-redux";

import ServiceCardItem from "./ServiceCardItem";

const ServiceCards = () => {
	const services = useSelector(state => state.search.services);
	//TODO: add empty view screen

	return (
		<div
			className={clsx(
				"grid gap-md pb-[40px] pt-[32px] xl:pb-[80px]",
				"xl:grid-cols-2 xl:items-center xl:justify-between"
			)}
		>
			{services.map(service => (
				<ServiceCardItem {...service} key={service.id} />
			))}
		</div>
	);
};

export default ServiceCards;
