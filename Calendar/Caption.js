import { format } from "date-fns";
import { useNavigation } from "react-day-picker";

import { NextButton, PrevButton } from "elements/NavigationElements";

import { CaptionHolder, CaptionLabel } from "./Calendar.style";

const Caption = props => {
	const { goToMonth, nextMonth, previousMonth } = useNavigation();

	return (
		<CaptionHolder>
			<PrevButton
				disabled={!previousMonth}
				onClick={() => previousMonth && goToMonth(previousMonth)}
			/>
			<CaptionLabel>{format(props.displayMonth, "MMMM yyy")}</CaptionLabel>
			<NextButton disabled={!nextMonth} onClick={() => nextMonth && goToMonth(nextMonth)} />
		</CaptionHolder>
	);
};

export default Caption;
