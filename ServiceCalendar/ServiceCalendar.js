import { format } from "date-fns";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ACCENT, CALENDAR_BOOKED_DAYS } from "colors";
import { transparentize } from "styleHelpers";

import Calendar from "components/Calendar";
import Modal from "components/Modal";

import CalendarIcon from "icons/calendar.svg";
import CloseIcon from "icons/close.svg";
import EditIcon from "icons/pen.svg";

import {
	AddButton,
	CalendarHolder,
	ContentHolder,
	DeleteButton,
	EditButton,
	ErrorMessage,
	Period,
	PeriodButtonsHolder,
	PeriodName,
	PeriodRange,
	Periods,
	PeriodsHolder,
	Row,
	SaveButton,
	Title,
	Wrapper
} from "./ServiceCalendar.style";

const bookedStyle = { border: "none", backgroundColor: transparentize(CALENDAR_BOOKED_DAYS, 0.3) };
const periodsStyle = {
	backgroundColor: transparentize(ACCENT, 0.06)
};

const ServiceCalendar = ({ onClose }) => {
	const { t } = useTranslation();
	const [range, setRange] = useState({});
	const [rangeError, setRangeError] = useState(false);
	const [periods, setPeriods] = useState([
		{ id: "period1", from: new Date(2023, 0, 18), to: new Date(2023, 0, 21) },
		{ id: "period2", from: new Date(2023, 0, 28), to: new Date(2023, 0, 28) }
	]);
	const [editedPeriodId, setEditedPeriodId] = useState("");
	//TODO: bookedDays should come from BE
	const bookedDays = [new Date(2023, 0, 15), new Date(2023, 0, 16)];
	const filteredPeriods = periods.filter(period => period.id !== editedPeriodId);
	const disabledDays = [...bookedDays, ...filteredPeriods];
	const addButtonDisabled = rangeError || !range || !Object.keys(range).length;

	const modifiers = { booked: bookedDays, periods: filteredPeriods };
	const modifiersStyles = { booked: bookedStyle, periods: periodsStyle };

	const onAddPeriod = () => {
		if (range && !rangeError) {
			setPeriods(periods => {
				if (editedPeriodId) {
					return periods.map(period => {
						if (period.id === editedPeriodId) {
							return {
								id: editedPeriodId,
								from: range.from,
								to: range.to ? range.to : range.from
							};
						}
						return period;
					});
				}
				const newPeriod = { id: uuidv4() };
				if (range.from) {
					newPeriod.from = range.from;
				}
				if (range.to) {
					newPeriod.to = range.to;
				} else if (range.from) {
					newPeriod.to = range.from;
				}

				return [...periods, newPeriod];
			});
			setRange({});
			setEditedPeriodId("");
		}
	};

	const onPeriodDelete = periodId => () => {
		setPeriods(periods => periods.filter(({ id }) => id !== periodId));
	};

	const onPeriodEdit = periodId => () => {
		const editedPeriod = periods.find(({ id }) => id === periodId);
		if (editedPeriod) {
			setRange({ from: editedPeriod.from, to: editedPeriod.to });
			setEditedPeriodId(periodId);
		}
	};

	const onSave = () => {
		//TODO: save period to backend
		onClose();
	};

	useEffect(() => {
		if (range) {
			const bookedDaysInRange = bookedDays.reduce((acc, curr) => {
				if (curr >= range.from && curr <= range.to) {
					acc.push(curr);
				}

				return acc;
			}, []);
			const periodDaysInRange = periods.reduce((acc, curr) => {
				if (curr.id !== editedPeriodId && curr.from >= range.from && curr.to <= range.to) {
					acc.push(curr);
				}

				return acc;
			}, []);
			setRangeError(!!(bookedDaysInRange.length || periodDaysInRange.length));
		} else {
			setRangeError(false);
		}
	}, [range, bookedDays, periods, editedPeriodId]);

	return (
		<Modal onClose={onClose}>
			<Wrapper>
				<Title>{t("service.calendar.title")}</Title>
				<ContentHolder>
					<CalendarHolder>
						<Calendar
							onSelect={setRange}
							modifiers={modifiers}
							modifiersStyles={modifiersStyles}
							selected={range}
							disabled={disabledDays}
						/>
					</CalendarHolder>
					<Row>
						<AddButton disabled={addButtonDisabled} onClick={onAddPeriod}>
							<CalendarIcon />
							{t("service.calendar.periodButton")}
						</AddButton>
						<SaveButton onClick={onSave} disabled={!periods.length}>
							{t("saveButton.text")}
						</SaveButton>
						<Periods>
							{rangeError && (
								<ErrorMessage>{t("service.calendar.rangeError")}</ErrorMessage>
							)}
							<PeriodsHolder>
								{periods.map(({ id, from, to }, index) => {
									if (!from || !to) {
										return null;
									}

									return (
										<Period key={id}>
											<div>
												<PeriodName>{`Period ${index + 1}:`}</PeriodName>
												<PeriodRange>{`${format(
													from,
													"dd.MM.yyyy"
												)}-${format(to, "dd.MM.yyyy")}`}</PeriodRange>
											</div>
											<PeriodButtonsHolder>
												<EditButton onClick={onPeriodEdit(id)}>
													<EditIcon />
												</EditButton>
												<DeleteButton onClick={onPeriodDelete(id)}>
													<CloseIcon />
												</DeleteButton>
											</PeriodButtonsHolder>
										</Period>
									);
								})}
							</PeriodsHolder>
						</Periods>
					</Row>
				</ContentHolder>
			</Wrapper>
		</Modal>
	);
};

export default ServiceCalendar;
