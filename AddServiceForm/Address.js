import { useTranslation } from "next-i18next";
import { useRef } from "react";

import BingMap from "components/v2/BingMap";
import Error from "elements/Error";
import Input from "elements/Input";
import Label from "elements/Label";
import useAutosuggest from "hooks/useAutosuggest";
import useBingApi from "hooks/useBingApi";

import { AddressInputsHolder, MapHolder, Title } from "./AddServiceForm.style";

const Address = ({
	formik: { values, handleChange, handleBlur, touched, errors, setFieldValue }
}) => {
	const { t } = useTranslation();

	const inputRef = useRef(null);
	const suggestionsContainerRef = useRef(null);

	const { bingApiReady } = useBingApi();

	useAutosuggest({
		inputRef,
		suggestionsContainerRef,
		onAddressSelect: ({ address, location }) => {
			setFieldValue("address", address);
			setFieldValue("location", location);
		},
		bingApiReady
	});

	return (
		<div>
			<Title>{t("serviceAdd.address.title")}</Title>
			<AddressInputsHolder>
				<div>
					<Label htmlFor='address'>{t("address")}</Label>
					<div ref={suggestionsContainerRef}>
						<Input
							id='address'
							name='address'
							type='search'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.address}
							ref={inputRef}
						/>
					</div>
				</div>
				<div>
					<Label htmlFor='radius'>{t("radius")}</Label>
					<Input
						id='radius'
						name='radius'
						type='number'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.radius}
					/>
					{touched.address && errors.address ? <Error>{errors.address}</Error> : null}
				</div>
			</AddressInputsHolder>

			<MapHolder>
				<BingMap
					bingApiReady={bingApiReady}
					radius={values.radius}
					address={values.address}
					serviceName={values.serviceName}
				/>
			</MapHolder>
		</div>
	);
};

export default Address;
