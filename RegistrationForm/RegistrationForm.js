import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "next-i18next";
import getConfig from "next/config";
import { useRouter } from "next/router";

import { Hub } from "aws-amplify";
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from "yup";

import { routes } from "routes";
import { addBearerToken, removeBearerToken } from "services/axios";
import { getLoggedIn, logout, setToken } from "slices";
import {
	confirmSignUp,
	getUser,
	LoginFacebook,
	LoginGoogle,
	resendConfirmationCode,
	signUp
} from "utilities/auth";

import FacebookIcon from "icons/facebook.svg";
import GoogleIcon from "icons/google.svg";

import Button from "elements/v2/Button";
import Checkbox from "elements/v2/Checkbox";

import CodeForm from "components/CodeForm";
import EmailForm from "components/EmailForm";

const { publicRuntimeConfig } = getConfig();

const AuthStatus = {
	EMAIL: "EMAIL",
	CODE: "CODE"
};

const RegistrationForm = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const dispatch = useDispatch();

	const [userName, setUserName] = useState(null);
	const [status, setAuthStatus] = useState(AuthStatus.EMAIL);
	const [codeHandlingError, setCodeHandlingError] = useState("");

	const loggedIn = useSelector(getLoggedIn);

	const formik = useFormik({
		initialValues: {
			email: "",
			termsAndConditions: false,
			dataProtectionInformation: false
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(t("registrationForm.fields.email.error"))
				.required(t("registrationForm.fields.email.error")),
			termsAndConditions: Yup.bool().oneOf(
				[true],
				t("registrationForm.fields.termsAndConditions.error")
			),
			dataProtectionInformation: Yup.bool().oneOf(
				[true],
				t("registrationForm.fields.dataProtectionInformation.error")
			)
		}),
		onSubmit: async (values, { setFieldError }) => {
			if (values.termsAndConditions && values.dataProtectionInformation) {
				setUserName(values.email);
				try {
					await signUp(values.email);
					setAuthStatus(AuthStatus.CODE);
				} catch (e) {
					if (e.cause) {
						setFieldError("email", t(`registrationForm.error.${e.cause}`));
					}
					console.log("An error occured while handling your username.");
				}
			} else {
				setErrors();
			}
		}
	});

	const {
		setTouched,
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
				case "signIn_failure":
				case "cognitoHostedUI_failure":
					console.log("Sign in failure", data);
					break;
			}
		});
	}, []);

	useEffect(() => {
		if (loggedIn) {
			router.replace(routes.welcome);
		}
	}, [loggedIn]);

	useEffect(() => {
		if (
			(touched.termsAndConditions && errors.termsAndConditions) ||
			(touched.dataProtectionInformation && errors.dataProtectionInformation)
		) {
			setCodeHandlingError(t("registrationForm.error.DPIAndTAC"));
		} else {
			setCodeHandlingError("");
		}
	}, [errors, touched]);

	const setErrors = () => {
		if (!values.termsAndConditions) {
			setFieldError(
				"termsAndConditions",
				t("registrationForm.fields.termsAndConditions.error")
			);
			setTouched({ termsAndConditions: true });
		}

		if (!values.dataProtectionInformation) {
			setFieldError(
				"dataProtectionInformation",
				t("registrationForm.fields.dataProtectionInformation.error")
			);
			setTouched({ dataProtectionInformation: true });
		}
	};
	const FacebookLoginHandler = () => {
		if (values.termsAndConditions && values.dataProtectionInformation) {
			LoginFacebook();
		} else {
			setErrors();
		}
	};

	const GoogleLoginHandler = () => {
		if (values.termsAndConditions && values.dataProtectionInformation) {
			LoginGoogle();
		} else {
			setErrors();
		}
	};

	const handleResend = async () => {
		try {
			await resendConfirmationCode(userName);
		} catch (e) {
			console.log("An error occured while handling your username.");
		}
	};

	const handleCode = async (confirmCode, actions) => {
		try {
			await confirmSignUp(userName, confirmCode);
		} catch (e) {
			if (e.cause) {
				setCodeHandlingError(t(`codeForm.error.${e.cause}`));
			}
			setCodeHandlingError(t("codeForm.error.DEFAULT"));
			console.log(e, "An error occured while handling your code.");
		}
	};

	return (
		<div>
			{AuthStatus.CODE == status && (
				<div>
					<div className='maxXl:container'>
						<h2
							className={clsx(
								"typographyHeadline-4Bold  text-left",
								"mb-[4px] xl:typographyHeadline-2Bold xl:text-center"
							)}
						>
							{t("codeForm.title")}
						</h2>
						<p
							className={clsx(
								"typographySmallRegular text-left",
								"xl:typographyInputLargeRegular xl:text-center"
							)}
						>
							{t("codeForm.description")}
						</p>
					</div>

					<div className='mt-lg mb-[80px] rounded-3xl bg-white px-lg py-[40px] shadow-default xl:mt-[40px] xl:px-xl'>
						<CodeForm
							handleCode={handleCode}
							handleChange={handleChange}
							handleBlur={handleBlur}
							resend={handleResend}
							codeHandlingError={codeHandlingError}
						/>
					</div>
				</div>
			)}
			{AuthStatus.EMAIL == status && (
				<form onSubmit={formik.handleSubmit}>
					<h2
						className={clsx(
							"typographyHeadline-4Bold text-left maxXl:container",
							"mb-[40px] xl:typographyHeadline-2Bold xl:text-center"
						)}
					>
						{t("registrationForm.title")}
					</h2>
					<div className='mb-[40px] rounded-3xl bg-white py-xl px-[40px] shadow-default'>
						{!publicRuntimeConfig.IS_PROD && (
							<div className='border-border-default'>
								<p className=' typographySmallBold mb-md text-fg-default'>
									{t("registrationForm.signInWith")}
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
								<p className='typographySmallRegular mb-[16px] text-center text-fg-muted'>
									{t("registrationForm.continue")}
								</p>
							</div>
						)}
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
						<div className='grid grid-cols-1 gap-lg border-t border-border-default pt-[40px]'>
							<Checkbox
								className='typographySmallRegular'
								label={t(
									"registrationForm.fields.dataProtectionInformation.label",
									{
										link: `<a class='text-accent-default' href='${t(
											"registrationForm.fields.dataProtectionInformation.link"
										)}' target='_blank'>${t(
											"registrationForm.fields.dataProtectionInformation.linkText"
										)}</a>`
									}
								)}
								name='dataProtectionInformation'
								setFieldValue={setFieldValue}
								values={values}
								touched={touched.dataProtectionInformation}
								error={errors.dataProtectionInformation}
							/>
							<Checkbox
								className='typographySmallRegular'
								label={t("registrationForm.fields.termsAndConditions.label", {
									link: `<a class='text-accent-default' href='${t(
										"registrationForm.fields.termsAndConditions.link"
									)}' target='_blank'>${t(
										"registrationForm.fields.termsAndConditions.linkText"
									)}</a>`
								})}
								name='termsAndConditions'
								setFieldValue={setFieldValue}
								values={values}
								touched={touched.dataProtectionInformation}
								error={errors.termsAndConditions}
							/>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};
export default RegistrationForm;
