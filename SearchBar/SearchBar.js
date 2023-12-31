import clsx from "clsx";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "routes";

import { getSearchBarData } from "selectors";
import { fetchCategories, searchServices, setInitialParams, setSearchParams } from "slices";

import Button from "elements/v2/Button";
import Input from "elements/v2/Input";
import Select from "elements/v2/Select";
import useAutosuggest from "hooks/useAutosuggest";

import SearchPinIconUrl from "icons/search-pin.svg?url";
import SearchBarIcon from "icons/searchbar.svg";

const SearchBar = ({ className, bingApiReady }) => {
	const [onInputFocus, setInputFocus] = useState(false);
	const [initialServiceValue, setInitialServiceValue] = useState(null);
	const [initialCategoryValue, setInitialCategoryValue] = useState(null);

	const { t } = useTranslation();

	const dispatch = useDispatch();

	const router = useRouter();

	const { categories, services, searchParams } = useSelector(getSearchBarData);

	const inputRef = useRef(null);
	const suggestionsContainerRef = useRef(null);

	const formik = useFormik({
		initialValues: {
			category: router.query.category,
			service: router.query.service,
			radius: router.query.radius,
			address: router.query.address
		},
		onSubmit: ({ address, radius }, { setFieldError }) => {
			if (address && !radius) {
				setFieldError("radius", true);
			} else {
				dispatch(setSearchParams([{ name: "page", value: 0 }]));
				dispatch(searchServices(searchParams));
				router.push({ pathname: routes.search, query: searchParams });
			}
		}
	});

	useAutosuggest({
		inputRef,
		suggestionsContainerRef,
		onAddressSelect: ({ address, location }) => {
			formik.setFieldValue("address", address);
			dispatch(
				setSearchParams([
					{ name: "lat", value: location.lat },
					{ name: "lng", value: location.lng },
					{ name: "address", value: address }
				])
			);
		},
		bingApiReady
	});

	const onAddressChange = e => {
		const address = e.target.value;
		formik.setFieldValue("address", address);
		if (!address) {
			dispatch(
				setSearchParams([
					{ name: "lat", value: null },
					{ name: "lng", value: null },
					{ name: "address", value: null }
				])
			);
		}
	};

	const onRadiusChange = e => {
		const radius = e.target.value;
		formik.setFieldValue("radius", radius);
		dispatch(setSearchParams([{ name: "radius", value: radius }]));
	};

	const searchParamsChangeHandler = (name, value) => {
		dispatch(setSearchParams([{ name, value: value.value }]));
		formik.setFieldValue(name, value.value);
	};

	const onFocusHandler = value => () => {
		setInputFocus(value);
	};

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(setInitialParams(router.query));
	}, []);

	useEffect(() => {
		if (
			categories.length &&
			services.length &&
			!(initialServiceValue && initialCategoryValue)
		) {
			Object.keys(router.query).forEach(name => {
				if (router.query[name]) {
					formik.setFieldValue(name, router.query[name]);
					if (name === "category") {
						const category = categories.find(
							({ value }) => value === router.query[name]
						);

						category && setInitialCategoryValue(category);
					}
					if (name === "service") {
						const service = services.find(({ value }) => value === router.query[name]);
						service && setInitialServiceValue(service);
					}
				}
			});
		}
	}, [categories?.length, services?.length]);

	return (
		<div
			className={clsx(
				className,
				"rounded-[30px] bg-white py-[35px] px-[20px] shadow-search-bar",
				"sm:py-lg sm:px-xl md:rounded-full xl:px-xxxl xl:py-xxl"
			)}
		>
			<form
				onSubmit={formik.handleSubmit}
				className=' flex flex-wrap md:gap-md xl:flex-nowrap'
			>
				<div className='mb-md w-full min-w-[270px] md:mb-0 md:w-[270px] '>
					<Select
						isSearchable
						placeholder={t("search.fields.categories")}
						options={categories}
						changeHandler={searchParamsChangeHandler}
						value={searchParams.category}
						name='category'
						defaultValue={initialCategoryValue}
					/>
				</div>
				<div className='mb-md w-full  min-w-[270px] md:mb-0 md:w-[270px]'>
					<Select
						isSearchable
						className='h-[40px] '
						options={services}
						placeholder={t("search.fields.services")}
						changeHandler={searchParamsChangeHandler}
						value={searchParams.service}
						name='service'
						defaultValue={initialServiceValue}
					/>
				</div>
				<div
					className={clsx(
						onInputFocus ? "border-grey-800 " : "border-border-default",
						"relative mb-md flex h-[40px] w-full  min-w-[270px] rounded-full border-2 border-solid  md:mb-0 md:w-[270px]"
					)}
				>
					<div ref={suggestionsContainerRef}>
						<Input
							onInputFocus={onInputFocus}
							placeholder={t("search.fields.location")}
							className='h-[36px] w-2/3 rounded-full border-0'
							icon={SearchPinIconUrl}
							onFocus={onFocusHandler(true)}
							onBlur={onFocusHandler(false)}
							onChange={onAddressChange}
							name='address'
							value={formik.values.address}
							innerRef={inputRef}
						/>
					</div>
					<Input
						name='radius'
						value={formik.values.radius}
						type='number'
						placeholder={t("radius")}
						onChange={onRadiusChange}
						className='absolute top-0 right-0 h-[37px] w-[124px] rounded-full border-2 focus:border-grey-800'
						error={formik.errors.radius}
					/>
				</div>
				<div className='w-full  md:w-[270px]'>
					<Button
						color='black'
						className='h-[40px] min-h-[40px]'
						type='submit'
						text={t("search.searchButton")}
						disabled={
							!searchParams.category && !searchParams.service && !searchParams.address
						}
					>
						<SearchBarIcon className='text-button-large  mr-sm' />
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
