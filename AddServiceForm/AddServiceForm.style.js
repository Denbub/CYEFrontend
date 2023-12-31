import styled from "styled-components";

import { TEXT_GREY, TEXT_GREY_DARK } from "colors";
import { breakpoints } from "constant";
import ButtonBase from "elements/Button";
import InputBase from "elements/Input";
import LabelBase from "elements/Label";
import ContainerBase from "elements/v2/Container";
import NextImage from "next/image";

export const MainServiceWrapper = styled.div`
	width: 100%;
	position: relative;
	padding-top: 42px;
`;
export const MainServiceHolder = styled(ContainerBase)`
	position: relative;
	margin-bottom: 65px;
`;

export const Title = styled.h4`
	font-size: 34px;
	line-height: 50px;
	text-align: center;
	margin-bottom: 25px;
`;

export const SubTitle = styled.div`
	font-size: 18px;
	line-height: 28px;
	margin: 0 auto;
	color: ${TEXT_GREY};
	font-weight: 400;
	text-align: center;
	margin-bottom: 30px;
	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 428px;
		max-width: 100%;
		margin-bottom: 38px;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Label = styled(LabelBase)`
	margin-bottom: 6px;
`;

export const Input = styled(InputBase)`
	height: 50px;
	margin-bottom: 14px;
`;

export const Button = styled(ButtonBase)`
	margin-top: 20px;
	font-size: 14px;
	width: 100%;
	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 157px;
	}
`;

export const FormHolder = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	margin: 30px 0;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-gap: 25px;
		margin: 56px 0;
		grid-template-columns: repeat(2, 1fr);
	}
`;

export const ButtonHolder = styled.div`
	max-width: 100%;
	margin: 0 auto;
	width: 500px;
	display: flex;
	flex-direction: column;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		justify-content: space-around;
		flex-direction: row;
	}
`;

export const Icon = styled(NextImage)`
	border-radius: 20px;
`;

export const CategoriesHolder = styled.div`
	display: flex;
	margin: 34px 0;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;

	& > div {
		width: 100%;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		flex-direction: row;
		margin: 30px 0;

		& > div {
			width: 25%;
		}
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		& > div {
			width: 16%;
		}
	}
`;

export const InputHolder = styled.div`
	margin-bottom: 34px;
	width: 520px;
	max-width: 100%;
	margin: 0 auto;
`;

export const EventTypesHolder = styled.div`
	max-width: 100%;
	display: grid;
	grid-template-columns: repeat(1, 1fr);

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-gap: 10px;
		grid-template-columns: repeat(4, 1fr);
		& > div {
			margin: 0;
		}
	}
`;

export const MapHolder = styled.div`
	height: 385px;
	margin: 27px 0 30px;

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin: 50px 0 85px;
	}

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin: 30px 0 50px;
	}
`;

export const NoneMainServiceHolder = styled.div`
	@media screen and (min-width: ${breakpoints.TABLET}) {
		width: 680px;
		margin: 0 auto;
		max-width: 100%;
	}
`;

export const SelectHolder = styled.div`
	width: 386px;
	max-width: 100%;
	margin: 0 auto;
`;
export const Template = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	justify-content: center;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-gap: 10px;
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		grid-gap: 10px;
		margin-bottom: ${({ noGap }) => (noGap ? "0" : "38px")};
		grid-template-columns: repeat(${({ count }) => count}, 386px);
	}
`;
export const AddressInputsHolder = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	justify-content: center;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-gap: 10px;
		grid-template-columns: repeat(2, 1fr);
	}
`;
export const CheckboxTemplateTitle = styled.div`
	font-size: 18px;
	line-height: 28px;
	color: ${TEXT_GREY_DARK};
	margin-top: 30px;
	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin-top: 48px;
	}
`;
export const CheckboxHolder = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	justify-content: center;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-gap: 10px;
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		grid-gap: 10px;
		grid-template-columns: repeat(3, 386px);
	}
`;
export const TemplateTitle = styled.div`
	font-size: 18px;
	line-height: 28px;
	color: ${TEXT_GREY};
	margin-bottom: 30px;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		margin-bottom: 38px;
	}
`;

export const TemplateWrapper = styled.div`
	margin: 0 0 30px;
	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		margin: 0 0 98px;
	}
`;
export const IconHolder = styled.div`
	position: relative;

	width: 30px;
	height: 30px;
	margin-bottom: 12px;
	img {
		border-radius: 0;
	}
`;
export const CategoryAttributesTitle = styled(TemplateTitle)`
	text-align: center;
`;

export const FinalWrapper = styled.div`
	margin: 0 auto 150px;
	p {
		text-align: center;
	}

	@media screen and (min-width: ${breakpoints.LAPTOP}) {
		width: 630px;
	}
`;
export const InputsHolder = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (min-width: ${breakpoints.TABLET}) {
		grid-gap: 10px;
		grid-template-columns: repeat(2, 1fr);
	}
`;
