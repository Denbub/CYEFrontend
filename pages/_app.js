import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import { Provider } from "react-redux";
import configureAppStore from "store";
import nextI18NextConfig from "../../next-i18next.config";

import Layout from "components/Layout";

import "styles/fonts.css";
import "styles/global.css";

const store = configureAppStore();
const MyApp = ({ Component, pageProps, features }) => (
	<>
		<Head>
			<meta name='viewport' content='initial-scale=1, maximum-scale=1' />
		</Head>
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} features={features} />
			</Layout>
		</Provider>
	</>
);

export default appWithTranslation(MyApp, nextI18NextConfig);
