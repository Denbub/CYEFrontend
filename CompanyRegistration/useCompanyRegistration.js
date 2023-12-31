import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { companyRegistrationStatus } from "constant";
import { phoneNumberRegex } from "utilities";

import { routes } from "routes";
import { getCompany } from "selectors";
import { createCompany, getAccountLink, updateUser } from "slices";

export const steps = {
	firstStep: 0,
	secondStep: 1,
	onboarding: 2,
	final: 3
};

const formSteps = {
	0: ["name", "lastName", "country"],
	1: ["email", "phone", "companyName"]
};

const useCompanyRegistration = () => {
	const router = useRouter();
	const { step } = router.query;
	const [activeStep, setActiveStep] = useState(steps[step] || steps.firstStep);
	const { id, url, loading, status, statusLoading } = useSelector(getCompany);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const processing = loading || statusLoading;
	const nextButtonVisibility = activeStep < Object.keys(steps).length && !processing;
	const prevButtonVisibility = !processing;

	const textByStep = {
		[steps.firstStep]: {
			title: t("companyRegistration.registration.title"),
			subTitle: t("companyRegistration.registration.subTitle"),
			caption: t("companyRegistration.registration.caption")
		},
		[steps.secondStep]: {
			title: t("companyRegistration.registration.title"),
			subTitle: t("companyRegistration.registration.subTitle"),
			caption: t("companyRegistration.registration.caption")
		},
		[steps.onboarding]: {
			title: t("companyRegistration.onboarding.title"),
			subTitle: t("companyRegistration.onboarding.subTitle"),
			caption: t("companyRegistration.onboarding.caption")
		},
		[steps.final]: {
			title: t("companyRegistration.final.title"),
			subTitle: t("companyRegistration.final.subTitle")
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			lastName: "",
			phone: "",
			country: "",
			companyName: ""
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.max(60, "Must be 60 characters or less")
				.required(t("errors.required.text")),
			email: Yup.string()
				.email("Geben Sie bitte eine gültige E-Mail-Adresse ein.")
				.required(t("errors.required.text")),
			lastName: Yup.string()
				.max(60, "Must be 60 characters or less")
				.required(t("errors.required.text")),
			phone: Yup.string()
				.matches(phoneNumberRegex, t("errors.invalidPhone"))
				.required(t("errors.required.text")),
			country: Yup.object().required(t("errors.required.text")),
			companyName: Yup.string().required(t("errors.required.text"))
		})
	});

	const createAccount = () => {
		const { email, phone, name, lastName, country, companyName } = formik.values;

		dispatch(
			createCompany({
				email,
				phone,
				name: companyName,
				country: country.value
			})
		);
		dispatch(
			updateUser({
				first_name: name,
				last_name: lastName
			})
		);
	};

	const nextClickHandler = () => {
		const touchedFields = formSteps[activeStep].reduce((acc, field) => {
			return { ...acc, [field]: true };
		}, {});

		formik.setTouched({ ...formik.touched, ...touchedFields });

		const emptyStepFields = formSteps[activeStep].some(field => {
			return !formik.values[field];
		});

		const errorsStep = formSteps[activeStep].some(field => {
			return formik.errors[field];
		});

		if (!emptyStepFields && !errorsStep) {
			if (activeStep === steps.secondStep) {
				createAccount();
			} else {
				setActiveStep(activeStep => ++activeStep);
			}
		}
	};

	const backClickHandler = () => {
		setActiveStep(activeStep => --activeStep);
	};

	useEffect(() => {
		if (id && activeStep !== steps.final) {
			if (!url) {
				dispatch(getAccountLink());
			} else if (url && status === companyRegistrationStatus.onboarding) {
				setActiveStep(steps.onboarding);
			} else {
				router.replace(routes.serviceAdd);
			}
		}
	}, [id, url]);

	return {
		processing,
		nextButtonVisibility,
		prevButtonVisibility,
		id,
		url,
		loading,
		status,
		statusLoading,
		nextClickHandler,
		backClickHandler,
		activeStep,
		formik,
		t,
		text: textByStep[activeStep]
	};
};

export default useCompanyRegistration;
