import { Step, StepperWrapper } from "./Stepper.style";

const Stepper = ({ activeStep, steps }) => {
	return (
		<StepperWrapper steps={Object.keys(steps).length}>
			{Object.keys(steps).map(index => (
				<Step key={index} active={activeStep >= index} lastActive={activeStep == index} />
			))}
		</StepperWrapper>
	);
};

export default Stepper;
