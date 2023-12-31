// AWS Amplify

import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Amplify, Auth, withSSRContext } from "aws-amplify";
import getConfig from "next/config";

import { routes } from "routes";
import { getRandomString } from "utilities";

const { publicRuntimeConfig } = getConfig();

Amplify.configure({
	Auth: {
		// REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
		identityPoolId: "",

		// REQUIRED - Amazon Cognito Region
		region: publicRuntimeConfig.COGNITO_AWS_REGION,

		// OPTIONAL - Amazon Cognito User Pool ID
		userPoolId: publicRuntimeConfig.COGNITO_USER_POOL,

		// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
		userPoolWebClientId: publicRuntimeConfig.CLIENT_ID,

		// OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
		mandatorySignIn: false,

		// OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
		// 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
		signUpVerificationMethod: "code", // 'code' | 'link'

		// OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
		authenticationFlowType: "USER_PASSWORD_AUTH",

		// OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
		clientMetadata: { myCustomKey: "myCustomValue" },

		// OPTIONAL - Hosted UI configuration
		oauth: {
			domain: "auth.strudle.co",
			redirectSignIn: publicRuntimeConfig.REDIRECT_URL,
			redirectSignOut: publicRuntimeConfig.REDIRECT_URL,
			responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
		}
	},
	ssr: true
});

export const checkUserSession = async () => {
	try {
		const user = await Auth.currentAuthenticatedUser();
		return { ...user.signInUserSession };
	} catch (error) {
		throw new Error(error.message);
	}
};

export const signIn = async username => {
	try {
		const user = await Auth.signIn(username);
		return user;
	} catch (error) {
		if (error == "UserNotFoundException: User does not exist.") {
			throw new Error(error, {
				cause: "USER_DOES_NOT_EXIT"
			});
		}

		if (error == "UserNotConfirmedException: User is not confirmed.") {
			resendConfirmationCode(username);
			return { unconfirmSignUp: true };
		}

		throw new Error("Please check on username or password");
	}
};

export const signUp = async username => {
	let userAttributes = null;
	let emailRegex = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
	if (emailRegex.test(username)) {
		userAttributes = {
			email: username,
			"custom:tos_accepted": "1"
		};
	} else {
		throw "Invalid user";
	}

	try {
		const { user } = await Auth.signUp({
			username: username,
			password: getRandomString(30),
			attributes: userAttributes,
			autoSignIn: {
				enabled: true
			}
		});
		return user;
	} catch (error) {
		if (error == "UsernameExistsException: An account with the given email already exists.") {
			throw new Error(error, {
				cause: "USER_EXITS"
			});
		}
		throw new Error("Something wrong occured when we were creating your account");
	}
};

export async function answerCustomChallenge(cognitoUser, code) {
	try {
		const answerResponse = await Auth.sendCustomChallengeAnswer(cognitoUser, code);
		return answerResponse;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function confirmSignUp(cognitoUser, code) {
	try {
		const answerResponse = await Auth.confirmSignUp(cognitoUser, code);
		return answerResponse;
	} catch (error) {
		if (
			error == "CodeMismatchException: Invalid verification code provided, please try again."
		) {
			throw new Error(error, {
				cause: "CODE_MISMATCH_EXCEPTION"
			});
		}
		console.log("Apparently the user did not enter the right code", error);
	}
}
export const getUser = async () => {
	try {
		const userData = Auth.currentAuthenticatedUser();
		return userData;
	} catch (error) {
		console.log("Not signed in");
	}
};

export const currentSession = async () => {
	try {
		const sessionData = Auth.currentSession();
		return sessionData;
	} catch (error) {
		console.log("Not signed in");
	}
};
export const LoginFacebook = async () => {
	Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
};

export const LoginGoogle = async () => {
	Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
};

export const signOut = async () => {
	try {
		await Auth.signOut();
	} catch (error) {
		console.log(error);
	}
};

export const globalSignOut = async () => {
	try {
		await Auth.signOut({ global: true });
	} catch (error) {
		console.log(error);
	}
};

export const withAuth = async (context, cb) => {
	try {
		const SSR = withSSRContext(context);
		await SSR.Auth.currentAuthenticatedUser();

		return cb();
	} catch (error) {
		return {
			redirect: {
				destination: routes.login,
				permanent: false
			}
		};
	}
};

export const publicPageRedirect = async (context, cb) => {
	try {
		const SSR = withSSRContext(context);
		const user = await SSR.Auth.currentAuthenticatedUser();
		return {
			redirect: {
				destination: routes.home,
				permanent: false
			}
		};
	} catch (error) {
		return cb();
	}
};

export async function resendConfirmationCode(username) {
	try {
		const answerResponse = await Auth.resendSignUp(username);
		return answerResponse;
	} catch (error) {
		console.log("Apparently the user did not enter the right code", error);
	}
}
