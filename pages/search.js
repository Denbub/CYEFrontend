import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "routes";

import getServicesLocations from "selectors/getServicesLocations";
import { searchServices } from "slices";

import ChevronRight from "icons/chevronRight.svg";
import DotsIcon from "icons/dots.svg";

import SearchBar from "components/SearchBar";
import ServiceCards from "components/ServiceCards";
import Toggle from "components/Toggle";
import BingMap from "components/v2/BingMap";
import useBingApi from "hooks/useBingApi";

const Search = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const totalPages = useSelector(state => state.search.totalPages);
	const servicesLocations = useSelector(getServicesLocations);

	const [__isMobile, setIsMobile] = useState(null);
	const [mapVisibility, setMapVisibility] = useState(true);

	const { bingApiReady } = useBingApi();

	const query = router.query;

	useEffect(() => {
		setIsMobile(isMobile);
		dispatch(searchServices(query));
	}, []);

	const handlePageClick = page => {
		const newQuery = { ...query, page: page.selected };
		router.push({ pathname: routes.search, query: newQuery });
		dispatch(searchServices(newQuery));
	};

	const onToggleChange = () => {
		setMapVisibility(mapVisibility => !mapVisibility);
	};

	return (
		<div className='bg-bg-canvas'>
			<div className='container pb-[56px] pt-md xl:pt-[45px] xl:pb-[120px]'>
				<SearchBar bingApiReady={bingApiReady} />
				<div className=' mb-xxl mt-[80px] hidden items-center justify-end xl:visible xl:flex'>
					<Toggle initialState={true} onToggleChange={onToggleChange} />
					<span className=' typographyInputLargeRegular ml-sm'>
						{t("search.hideMap")}
					</span>
				</div>

				{mapVisibility && (
					<div className='hidden w-full xl:visible xl:flex'>
						<BingMap bingApiReady={bingApiReady} locations={servicesLocations} />
					</div>
				)}
				<ServiceCards />
				<ReactPaginate
					breakLabel={<DotsIcon />}
					nextLabel={<ChevronRight className='text-fg-default' />}
					previousLabel={
						<ChevronRight className='rotate-180 transform text-fg-default' />
					}
					onPageChange={handlePageClick}
					pageRangeDisplayed={__isMobile ? 3 : 5}
					marginPagesDisplayed={1}
					pageCount={totalPages}
					renderOnZeroPageCount={null}
					containerClassName='flex gap-sm justify-center'
					pageClassName='w-[32px] h-[32px] flex justify-center items-center border-2 border-bg-muted rounded-sm'
					activeClassName='bg-accent-default border-none'
					activeLinkClassName='text-fg-on-accent'
					pageLinkClassName='typographyButtonLargeRegular text-fg-muted'
					disabledLinkClassName='[&_svg]:text-bg-muted '
					breakClassName='w-[32px] h-[32px] flex justify-center items-center'
					initialPage={Number(query?.page) || 0}
				/>
			</div>
		</div>
	);
};

export const getServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale, ["common", "cookie"]))
		}
	};
};

export default Search;
