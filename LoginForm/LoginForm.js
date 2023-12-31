import { Hub } from "aws-amplify";
import clsx from "clsx";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { companyRegistrationStatus } from "constant";
import { routes } from "routes";
import { addBearerToken, removeBearerToken } from "services/axios";

import { getCompany } from "selectors";
import { fetchServices, getLoggedIn, logout, setToken } from "slices";

import {
	answerCustomChallenge,
	confirmSignUp,
	getUser,
	LoginFacebook,
	LoginGoogle,
	resendConfirmationCode,
	signIn
} from "utilities/auth";

const { publicRuntimeConfig } = getConfig();

import FacebookIcon from "icons/facebook.svg";
import GoogleIcon from "icons/google.svg";

import CodeForm from "components/CodeForm";
import EmailForm from "components/EmailForm";

import Button from "elements/v2/Button";

const AuthStatus = {
	EMAIL: "EMAIL",
	CODE: "CODE"
};

const LoginForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const dispatch = useDispatch();

	const [user, setUser] = useState("");
	const [userName, setUserName] = useState(null);
	const [status, setAuthStatus] = useState(AuthStatus.EMAIL);
	const [unconfirmedSignUp, setUnconfirmedSignUp] = useState(false);
	const [codeHandlingError, setCodeHandlingError] = useState("");
	const [emailConfirmed, setEmailConfirmed] = useState("");

	const loggedIn = useSelector(getLoggedIn);
	const { id: companyId, status: companyStatus } = useSelector(getCompany);
	const services = useSelector(state => state.service.services);
	const hasMainService = useSelector(state => state.company.companyInfo?.has_main_service);

	const formik = useFormik({
		initialValues: {
			email: ""
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(t("loginForm.fields.email.error"))
				.required(t("loginForm.fields.email.error"))
		}),
		onSubmit: async (values, { setFieldError }) => {
			setUserName(values.email);
			try {
				let user = await signIn(values.email);

				if (user.unconfirmSignUp) {
					setUnconfirmedSignUp(true);
				} else {
					setUser(user);
				}
				setAuthStatus(AuthStatus.CODE);
			} catch (e) {
				if (e.cause) {
					setCodeHandlingError(t(`loginForm.error.${e.cause}`));
				}

				console.log(e, "An error occured while handling your username.");
			}
		}
	});

	const {
		setValues,
		values,
		errors,
		isSubmitting,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
		setFieldError
	} = formik;
	useEffect(() => {
		const login = data => {
			if (data && data.signInUserSession) {
				const token = data.signInUserSession.idToken.jwtToken;
				const expired = data.signInUserSession.idToken.payload.exp;
				addBearerToken(token, expired);
				dispatch(setToken({ token, expired }));
			}
		};
		Hub.listen("auth", ({ payload: { event, data } }) => {
			switch (event) {
				case "autoSignIn":
				case "signIn":
				case "cognitoHostedUI":
					getUser().then(data => login(data));
					break;
				case "signOut":
					removeBearerToken();
					dispatch(logout());
					break;
				case "autoSignIn_failure":
				case "signIn_failure":
				case "cognitoHostedUI_failure":
					console.log("Sign in failure", data);
					break;
			}
		});
	}, []);

	useEffect(() => {
		if (loggedIn) {
			if (companyId !== null) {
				if (companyId) {
					if (companyStatus === companyRegistrationStatus.onboarding) {
						router.replace(routes.companyRegistration);
					} else {
						dispatch(fetchServices(companyId));
					}
				} else {
					router.replace(routes.welcome);
				}
			}
		}
	}, [companyId, loggedIn]);

	useEffect(() => {
		if (services) {
			if (services.length || !hasMainService) {
				router.replace(routes.profile);
			} else {
				router.replace(routes.serviceAdd);
			}
		}
	}, [services]);

	const FacebookLoginHandler = () => {
		LoginFacebook();
	};

	const GoogleLoginHandler = () => {
		LoginGoogle();
	};

	const handleResend = async () => {
		try {
			if (unconfirmedSignUp) {
				await resendConfirmationCode(userName);
			} else {
				let user = await signIn(userName);
				setUser(user);
			}

			setAuthStatus(AuthStatus.CODE);
		} catch (e) {
			console.log(e, "An error occured while handling your username.");
		}
	};

	const handleCode = async (confirmCode, actions) => {
		try {
			if (unconfirmedSignUp) {
				await confirmSignUp(userName, confirmCode);
				setEmailConfirmed(true);
				setAuthStatus(AuthStatus.EMAIL);
				setUnconfirmedSignUp(false);
			} else {
				const userData = await answerCustomChallenge(user, confirmCode);
				if (!userData.signInUserSession) {
					setCodeHandlingError(t("codeForm.error.DEFAULT"));
				} else {
					setCodeHandlingError("");
				}
			}
		} catch (e) {
			setCodeHandlingError(t("codeForm.error.DEFAULT"));
			console.log(e, "An error occured while handling your code.");
		}
	};

	return (
		<div>
			{AuthStatus.CODE == status && (
				<div>
					<h2
						className={clsx(
							"typographyHeadline-4Bold  text-left",
							"mb-[4px] xl:typographyHeadline-2Bold xl:text-center"
						)}
					>
						{t("codeForm.title")}
					</h2>
					{unconfirmedSignUp && (
						<p
							className={clsx(
								"typographySmallRegular text-left text-warning-emphasis",
								"xl:typographyInputLargeRegular xl:text-center"
							)}
						>
							{t("codeForm.unconfirmedSignUp")}
						</p>
					)}
					<p
						className={clsx(
							"typographySmallRegular text-left",
							"xl:typographyInputLargeRegular xl:text-center"
						)}
					>
						{t("codeForm.description")}
					</p>
					<div className='mt-lg mb-[80px] rounded-3xl bg-white px-lg py-[40px] shadow-default xl:mt-[40px] xl:px-xl'>
						<CodeForm
							handleCode={handleCode}
							handleChange={handleChange}
							handleBlur={handleBlur}
							resend={handleResend}
							codeHandlingError={codeHandlingError}
							unconfirmedSignUp={unconfirmedSignUp}
						/>
					</div>
				</div>
			)}
			{AuthStatus.EMAIL == status && (
				<form onSubmit={formik.handleSubmit}>
					<h2
						className={clsx(
							"typographyHeadline-4Bold  text-left",
							"mb-[4px] xl:typographyHeadline-2Bold xl:text-center"
						)}
					>
						{t("loginForm.title")}
					</h2>
					<p
						className={clsx(
							"typographySmallRegular text-left",
							"xl:typographyInputLargeRegular xl:text-center"
						)}
					>
						{t("loginForm.description")}
					</p>
					{emailConfirmed && (
						<p
							className={clsx(
								"typographySmallRegular text-left text-success-emphasis",
								"xl:typographyInputLargeRegular xl:text-center"
							)}
						>
							{t("loginForm.emailConfirmed")}
						</p>
					)}
					<div className='mt-[40px] mb-[40px] rounded-3xl bg-white px-xl py-[40px] shadow-default'>
						<EmailForm
							errors={errors}
							value={values.email}
							isSubmitting={isSubmitting}
							touched={touched}
							handleChange={handleChange}
							handleBlur={handleBlur}
							setFieldValue={setFieldValue}
							codeHandlingError={codeHandlingError}
						/>
						{!publicRuntimeConfig.IS_PROD && (
							<div className='border-t border-border-default pt-[32px]'>
								<p className='typographySmallRegular mb-[16px] text-center text-fg-muted'>
									{t("registrationForm.continue")}
								</p>
								<div className='mb-[32px] grid grid-cols-2  gap-sm '>
									<Button
										onClick={FacebookLoginHandler}
										className='h-[52px] rounded-md bg-grey-950 hover:bg-grey-900'
										color='black'
										type='button'
									>
										<FacebookIcon />
									</Button>
									<Button
										onClick={GoogleLoginHandler}
										className='h-[52px]  rounded-md bg-grey-950 hover:bg-grey-900'
										color='black'
										type='button'
									>
										<GoogleIcon />
									</Button>
								</div>
							</div>
						)}
					</div>
					<div className='border-t border-border-default pt-[30px]'>
						<p
							className={clsx(
								"typographySmallRegular text-center",
								"xl:typographyInputLargeRegular "
							)}
						>
							{t("loginForm.accountNonExist")}
							<Link
								href={routes.registration}
								className='pl-[5px] text-accent-default'
							>
								{t("loginForm.registration")}
							</Link>
						</p>
					</div>
				</form>
			)}
		</div>
	);
};
export default LoginForm;
