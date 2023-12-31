import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";

import SearchBar from "components/SearchBar";
import useBingApi from "hooks/useBingApi";

import Button from "elements/Button";

import { ButtonHolder, HeaderDescription, HeaderTitle } from "./Header.styles";

const Header = ({ component }) => {
	const {
		background,
		title,
		description,
		button,
		typography,
		show_search_bar: showSearchBar
	} = component;
	const {
		text_font_size: textFontSize,
		text_font_weight: textFontWeight,
		title: titleTypography
	} = typography;
	const router = useRouter();

	const { bingApiReady } = useBingApi();

	const onClickHandler = () => {
		router.push(button.url);
	};

	return (
		<div
			className={clsx("relative", {
				["mb-[195px] sm:mb-[80px]"]: showSearchBar
			})}
		>
			<div className={`relative z-20 text-left text-white`}>
				<div className='container relative z-20 box-border py-[108px] px-[10px] sm:pt-[180px] sm:pb-[160px]'>
					<HeaderTitle title={titleTypography}>{title}</HeaderTitle>
					<HeaderDescription fontSize={textFontSize} fontWeight={textFontWeight}>
						{description}
					</HeaderDescription>
					<ButtonHolder>
						<Button type='button' color='white' onClick={onClickHandler}>
							{button.text}
						</Button>
					</ButtonHolder>
				</div>
				<Image src={background} fill className=' object-cover object-center' />
			</div>
			{showSearchBar && (
				<div className='container absolute bottom-[-180px] z-20 sm:top-auto sm:bottom-[-85px] sm:right-0 sm:left-0'>
					<SearchBar bingApiReady={bingApiReady} />
				</div>
			)}
		</div>
	);
};

export default Header;
