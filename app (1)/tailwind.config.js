/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const colors = {
	"accent-default": "rgb(229, 5, 5)",
	"grey-800": "rgba(66, 66, 66, 1)",
	"grey-950": "rgba(31, 31, 31, 1)",
	"grey-900": "rgba(50, 50, 50, 1)",
	"grey-500": "rgba(158, 158, 158, 1)",
	"input-placeholder": "rgba(158, 158, 158, 1)",
	"input-disabled": "rgba(224, 224, 224, 1)",
	"border-default": "rgba(224, 224, 224, 1)",
	"fg-muted": "#616161",
	"fg-default": "#171717",
	"fg-on-accent": "#ffffff",
	"fg-subtle": "#9e9e9e",
	"fg-on-disabled": "#757575",
	"bg-subtle": "#eeeeee",
	"bg-muted": "#e0e0e0",
	"bg-canvas": "#fcfcfc",
	"success-emphasis": "#18a957",
	"warning-emphasis": "#ffbb38",
	"error-emphasis": "#e50505",
	"accent-disabled": "#E0E0E0",
	"form-outline": "#424242",
	overlay: "#f0f0f0",
	"theme-accent-muted": "#FA1919"
};

module.exports = {
	important: false,
	content: ["./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors,
			screens: {
				"2xl": "1328px",
				maxXl: { max: "1279px" }
			},
			spacing: {
				sm: "8px",
				md: "16px",
				lg: "24px",
				l: "32px",
				xl: "48px",
				xxl: "56px",
				xxxl: "112px",
				headerDesktop: "112px",
				headerMobile: "80px"
			},
			boxShadow: {
				"search-bar":
					"0px 4px 8px rgba(48, 49, 51, 0.1), 0px 0px 1px rgba(48, 49, 51, 0.05)",
				"shadow-theme-20":
					"0 0 1px 0 rgba(48, 49, 51, 0.05), 0 1px 3px 0 rgba(48, 49, 51, 0.1)",
				modal: "0px 8px 16px rgba(48, 49, 51, 0.1), 0px 0px 1px rgba(48, 49, 51, 0.05)",
				default:
					"0px 0px 1px 0px rgba(48, 49, 51, 0.05), 0px 8px 16px 0px  rgba(48, 49, 51, 0.1)",
				companyImage:
					"0 0 1px 0 rgba(48, 49, 51, 0.05), 0 2px 4px 0 rgba(48, 49, 51, 0.1);",
				editButton: "0 0 1px 0 rgba(48, 49, 51, 0.05), 0 4px 8px 0 rgba(48, 49, 51, 0.1);"
			},

			container: {
				center: true,
				padding: {
					DEFAULT: "24px",
					xl: 0
				}
			}
		}
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
		plugin(function ({ addComponents, addUtilities, theme }) {
			addComponents({
				".input-normal-regular": {
					"font-family": "Poppins",
					"font-size": "16px",
					"font-weight": "400",
					"line-height": "24px"
				},
				".input-normal-bold": {
					"font-family": "Poppins",
					"font-size": "16px",
					"font-weight": "600",
					"line-height": "24px"
				},
				".dropdown-indicator": {
					fill: theme("colors['input-placeholder']")
				},
				".bg-accent-emphasis-gradient": {
					backgroundImage: "linear-gradient(to bottom, #ae0404 0%, #d37676 100%)"
				},
				".bg-white-gradient": {
					backgroundImage:
						"linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)"
				},
				".bg-description-gradient": {
					backgroundImage:
						"linear-gradient(to bottom, rgba(252, 252, 252, 0.4) 0%, #fcfcfc 100%)"
				},
				".typographyHeadline-2Bold": {
					fontFamily: "Poppins",
					fontSize: "49px",
					fontWeight: "bold",
					lineHeight: "1.1",
					letterSpacing: "-0.49px"
				},
				".typographyHeadline-2Regular": {
					fontFamily: "Poppins",
					fontSize: "49px",
					lineHeight: 1.1,
					letterSpacing: "-0.49px"
				},
				".typographyHeadline-3Bold": {
					fontFamily: "Poppins",
					fontSize: "41px",
					fontWeight: "bold",
					lineHeight: "1.1",
					letterSpacing: "-0.41px"
				},
				".typographyHeadline-4Regular": {
					fontFamily: "Poppins",
					fontSize: "34px",
					lineHeight: "1.3",
					letterSpacing: "-0.34px"
				},
				".typographyHeadline-4Bold": {
					fontFamily: "Poppins",
					fontSize: "34px",
					fontWeight: "bold",
					lineHeight: "1.3",
					letterSpacing: "-0.34px"
				},
				".typographyHeadline-5Bold": {
					fontFamily: "Poppins",
					fontSize: "23px",
					fontWeight: "bold",
					lineHeight: "1.3",
					letterSpacing: "-0.01rem"
				},
				".typographyHeadline-3Regular": {
					fontFamily: "Poppins",
					fontSize: "41px",
					lineHeight: 1.1,
					letterSpacing: "-0.41px"
				},
				".typographyLeadRegular": {
					fontFamily: "Poppins",
					fontSize: "28px",
					lineHeight: "1.5"
				},
				".typographyLeadBold": {
					fontFamily: "Poppins",
					fontSize: "28px",
					fontWeight: "bold",
					lineHeight: "1.5",
					letterSpacing: "normal"
				},
				".typographyCaptionRegular": {
					fontFamily: "Poppins",
					fontSize: "13px",
					fontWeight: "normal",
					lineHeight: "1.5",
					letterSpacing: "normal"
				},
				".typographyBodyBold": {
					fontFamily: "Poppins",
					fontSize: "19px",
					fontWeight: "bold",
					lineHeight: 1.5
				},
				".typographyBodyRegular": {
					fontFamily: "Poppins",
					fontSize: "19px",
					fontWeight: "normal",
					lineHeight: 1.5
				},
				".typographySmallRegular": {
					fontFamily: "Poppins",
					fontSize: "16px",
					fontWeight: "normal",
					lineHeight: 1.5
				},
				".typographyButtonLargeRegular": {
					fontFamily: "Poppins",
					fontSize: "16px",
					lineHeight: "1.5",
					letterSpacing: "0.48px"
				},
				".typographyButtonLargeBold": {
					fontFamily: "Poppins",
					fontSize: "16px",
					fontWeight: 600,
					lineHeight: 1.5,
					letterSpacing: "0.48px"
				},
				".typographyInputLargeRegular": {
					fontFamily: "Poppins",
					fontSize: "19px",
					lineHeight: 1.5
				},
				".typographyInputNormalRegular": {
					fontFamily: "Poppins",
					fontSize: "16px",
					lineHeight: 1.5
				},
				".typographyButtonNormalBold": {
					fontFamily: "Poppins",
					fontSize: "13px",
					fontWeight: 600,
					lineHeight: 1.5,
					letterSpacing: "0.39px"
				},
				".typographyCaptionBold": {
					fontFamily: "Poppins",
					fontSize: "13px",
					fontWeight: "bold",
					lineHeight: 1.5
				},
				".typographySmallBold": {
					fontFamily: "Poppins",
					fontSize: "16px",
					fontWeight: "bold",
					lineHeight: 1.5
				},
				".typographyButtonXLargeBold": {
					fontFamily: "Poppins",
					fontSize: "23px",
					fontWeight: 600,
					lineHeight: 1.5,
					letterSpacing: "0.69px"
				},
				".typographyXSmallRegular ": {
					fontFamily: "Poppins",
					fontSize: "11px",
					lineHeight: "1.5"
				},
				".typographyTinyRegular": {
					fontFamily: "Poppins",
					fontSize: "9px",
					lineHeight: "1.5"
				},
				".typographyHeadline-5Bold": {
					fontFamily: "Poppins",
					fontSize: "23px",
					fontWeight: "bold",
					lineHeight: "1.3",
					letterSpacing: "-0.23px"
				},
				".pagination-bullet": {
					display: "inline-block",
					width: "8px",
					height: "8px",
					opacity: "1",
					background: "#e0e0e0",
					margin: "0 4px"
				},
				".pagination-bullet-active": {
					background: "rgb(229, 5, 5)"
				},
				".pagination-bullets": {
					display: "flex",
					justifyContent: "center",
					position: "absolute",
					bottom: "24px",
					left: "0",
					right: "0",
					zIndex: 10
				}
			});
			addUtilities({
				".inset-center": {
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)"
				},
				".inset-y-center": {
					top: "50%",
					transform: "translateY(-50%)"
				},
				".inset-x-center": {
					left: "50%",
					transform: "translateX(-50%)"
				},
				".fullScreen": {
					width: "100vw !important",
					height: "100vh !important"
				}
			});
		})
	]
};
