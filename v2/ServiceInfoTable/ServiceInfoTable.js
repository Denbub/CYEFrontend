import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import getConfig from "next/config";

import { updateService } from "slices";

import { getCompany } from "selectors";

import Button from "elements/v2/Button";
import Input from "elements/v2/Input";

import InfoTableItem from "./InfoTableItem";

const { publicRuntimeConfig } = getConfig();

const editModes = {
	price: "price",
	capacity: "capacity"
};

const ServiceInfoTable = ({ profilePage }) => {
	const { t } = useTranslation();
	const [price, setPrice] = useState(0);
	const [capacity, setCapacity] = useState(0);
	const [editMode, setEditMode] = useState("");

	const storedPrice = useSelector(state => state.service.price);
	const storedCapacity = useSelector(state => state.service.capacity);
	const serviceName = useSelector(state => state.service.title);
	const company = useSelector(getCompany);
	const dispatch = useDispatch();

	const entries = {
		companyName: 431991600,
		serviceName: 219573138
	};

	let requestFormUrl =
		"https://docs.google.com/forms/d/e/1FAIpQLSe1ABDQq5o4OX8hNuqT3WXRXAZ4w2ttLr7nudtog0HjP62s8g/viewform?usp=pp_url";

	if (company.name) {
		requestFormUrl += `&entry.${entries.companyName}=${encodeURIComponent(company.name)}`;
	}

	if (serviceName) {
		requestFormUrl += `&entry.${entries.serviceName}=${encodeURIComponent(serviceName)}`;
	}

	useEffect(() => {
		setPrice(storedPrice);
	}, [storedPrice]);

	useEffect(() => {
		setCapacity(storedCapacity);
	}, [storedCapacity]);

	const onEdit = mode => () => {
		if (mode === editMode) {
			const data = {};
			if (mode === editModes.price) {
				data.price = price;
			} else if (mode === editModes.capacity) {
				data.capacity = capacity;
			}
			dispatch(updateService(data));
			setEditMode("");
		} else {
			setEditMode(mode);
		}
	};

	//TODO: add debounce for onChange handler
	const onChange = e => {
		if (editMode === editModes.price) {
			setPrice(e.target.value);
		} else {
			setCapacity(e.target.value);
		}
	};

	return (
		<div className='mb-[40px]'>
			<ul className=' rounded-[16px] bg-fg-on-accent py-lg px-[26px] shadow-shadow-theme-20'>
				{(profilePage || !!price) && !publicRuntimeConfig.IS_PROD && (
					<InfoTableItem
						label={t("service.configurationForm.price")}
						value={t("service.configurationForm.pricePerDay", { price })}
						profilePage={profilePage}
						onEdit={onEdit(editModes.price)}
					>
						{editMode === editModes.price && (
							<Input
								name='price'
								type='number'
								min='0'
								value={price}
								onChange={onChange}
								className=' typographyInputLargeRegular mt-sm w-full rounded-full border-[2px] border-border-default'
							/>
						)}
					</InfoTableItem>
				)}
				{(profilePage || !!capacity) && (
					<InfoTableItem
						label={t("service.configurationForm.amountOfGuests")}
						value={t("service.configurationForm.capacityValue", { capacity })}
						profilePage={profilePage}
						onEdit={onEdit(editModes.capacity)}
						capacityItem
					>
						{editMode === editModes.capacity && (
							<Input
								name='capacity'
								type='number'
								min='0'
								value={capacity}
								onChange={onChange}
								className=' typographyInputLargeRegular mt-sm w-full rounded-full border-[2px] border-border-default'
							/>
						)}
					</InfoTableItem>
				)}
				{!profilePage && (
					<li className='py-[12px] first:pt-0 last:border-b-0 last:pb-0'>
						<Button className='!typographyButtonNormalBold'>
							<a
								href={requestFormUrl}
								target='_blank'
								rel='noreferrer'
								className='h-full w-full text-inherit'
							>
								Unverbindliches Angebot einholen
							</a>
						</Button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default ServiceInfoTable;
