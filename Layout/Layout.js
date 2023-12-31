import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { companyRegistrationStatus } from "constant";
import { routes } from "routes";

import { getCompany } from "selectors";
import { checkStatus, fetchCompany, fetchUser, fetchUserSession } from "slices";

import Footer from "components/Footer";
import Header from "components/Header";

import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
	const token = useSelector(state => state.user.token?.token);
	const expired = useSelector(state => state.user.token?.expired);
	const { id, status } = useSelector(getCompany);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(fetchUserSession());
	}, []);

	useEffect(() => {
		if (token) {
			setTimeout(() => {
				dispatch(fetchUser());
				dispatch(fetchCompany());
			}, 1000);
		}
	}, [token]);

	useEffect(() => {
		if (id && status !== companyRegistrationStatus.active) {
			dispatch(checkStatus());
		}
	}, [id]);

	return (
		<>
			{![routes.welcome, routes.registration, routes.login].includes(router.pathname) && (
				<Header />
			)}
			<main>{children}</main>
			<Footer />
			<ToastContainer />
		</>
	);
};

export default Layout;
