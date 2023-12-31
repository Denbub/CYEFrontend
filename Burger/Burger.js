import { BurgerWrapper } from "./Burger.style";

const Burger = ({ clickMenu, open }) => {
	return (
		<BurgerWrapper onClick={clickMenu} open={open}>
			<div />
			<div />
			<div />
		</BurgerWrapper>
	);
};

export default Burger;
