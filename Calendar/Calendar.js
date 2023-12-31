import { useTranslation } from "next-i18next";
import { DayContent, DayPicker } from "react-day-picker";

import SelectIcon from "icons/select.svg";

import Caption from "./Caption";

import CalendarWrapper, { BookedDay, BookedLabel } from "./Calendar.style";

const CustomDay = props => {
	const { t } = useTranslation();

	const booked = props.activeModifiers?.booked;

	if (booked) {
		return (
			<BookedDay>
				<DayContent {...props} />
				<BookedLabel>
					<SelectIcon />
					{t("service.calendar.booked")}
				</BookedLabel>
			</BookedDay>
		);
	}
	return <DayContent {...props} />;
};

const Calendar = ({ onSelect, modifiers = {}, modifiersStyles = {}, selected, disabled }) => {
	return (
		<CalendarWrapper>
			<DayPicker
				ISOWeek
				mode='range'
				modifiers={modifiers}
				modifiersStyles={modifiersStyles}
				onSelect={onSelect}
				selected={selected}
				disabled={disabled}
				components={{
					Caption,
					DayContent: CustomDay
				}}
				fromDate={new Date()}
			/>
		</CalendarWrapper>
	);
};

export default Calendar;
