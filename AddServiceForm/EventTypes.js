import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Checkbox from "elements/Checkbox";

import { addEventType, deleteEventType, fetchEventTypes, getEventTypes } from "slices";

import { EventTypesHolder, SubTitle, Title } from "./AddServiceForm.style";

const EventTypes = () => {
	const { t } = useTranslation();
	const { eventTypes, addedEventTypes } = useSelector(getEventTypes);
	const dispatch = useDispatch();

	const onChange = name => value => {
		if (value[name]) {
			dispatch(addEventType(name));
		} else {
			const removeEventTypeID = addedEventTypes.filter(
				eventType => eventType.event_type === name
			);
			dispatch(deleteEventType({ id: removeEventTypeID[0].id }));
		}
	};
	useEffect(() => {
		dispatch(fetchEventTypes());
	}, []);

	return (
		<div>
			<Title>{t("serviceAdd.eventTypes.title")}</Title>
			<SubTitle>{t("serviceAdd.eventTypes.subTitle")}</SubTitle>

			{eventTypes && (
				<EventTypesHolder>
					{eventTypes.map(eventType => (
						<Checkbox
							label={eventType.name}
							key={eventType.id}
							name={eventType.id}
							customStyle='smallSize'
							changeHandler={onChange(eventType.id)}
						/>
					))}
				</EventTypesHolder>
			)}
		</div>
	);
};

export default EventTypes;
