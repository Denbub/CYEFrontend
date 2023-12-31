import { mainApi } from "services/axios";
import { v4 as uuidv4 } from "uuid";

export function getRandomString(bytes) {
	// eslint-disable-next-line no-undef
	const randomValues = new Uint8Array(bytes);
	window.crypto.getRandomValues(randomValues);
	return Array.from(randomValues).map(intToHex).join("");
}

function intToHex(nr) {
	return nr.toString(16).padStart(2, "0");
}

export const onFileLoad =
	({ maxSizeMB = 1, onSuccess = () => {} }) =>
	({ target }) => {
		if (target.files && target.files[0]) {
			const allowedExtensions = ["jpg", "jpeg", "png"];
			const file = target.files[0];
			const fileExtension = file.name.split(".").pop();
			const byte = 1048576;
			if (file.size > maxSizeMB * byte) {
				return alert("your file is too big");
			}

			if (allowedExtensions.includes(fileExtension)) {
				onSuccess(file);
			} else {
				return alert("upload only images please");
			}
		}
	};

export const debounce = function (func, timeout) {
	let timer;

	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

export const fetchFeaturesConfig = async () => {
	const res = await fetch(
		"https://gitlab.com/api/v4/feature_flags/unleash/40028123/client/features/",
		{
			headers: {
				Accept: "application/json",
				"UNLEASH-INSTANCEID": "YNJx8bwRmgev-Zy4agGC",
				"UNLEASH-APPNAME": "cye-nextjs-frontend"
			}
		}
	);
	const json = await res.json();

	const parsedFeatures = json.features.reduce((acc, feature) => {
		return {
			[feature.name]: feature.enabled
		};
	}, {});

	return parsedFeatures;
};

export const getElementSizes = element => {
	if (element) {
		return {
			height: element.offsetHeight,
			width: element.offsetWidth,
			borderRadius: Number(window.getComputedStyle(element).borderRadius.slice(0, -2))
		};
	}
	return {};
};

export const editImage = (onImageEditingSuccess, editorRef) => () => {
	if (editorRef.current) {
		const canvas = editorRef.current.getImageScaledToCanvas();
		canvas.toBlob(
			blob => {
				if (blob) {
					const image = new File([blob], `${uuidv4()}.png`);
					onImageEditingSuccess(image);
				}
			},
			"image/jpeg",
			1
		);
	}
};

// Validates phone number in E.164 format
export const phoneNumberRegex = /^\+\d{1,3}\d{7,14}$/;

export const saveFileAction = async (url, file, fieldName) => {
	if (file) {
		const formData = new FormData();
		formData.append(fieldName, file);
		const response = await mainApi.patch(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		return response.data;
	} else {
		const response = await mainApi.patch(url, JSON.stringify({ [fieldName]: null }));
		return response.data;
	}
};

export const generateShortName = (name = "", length = 22) => {
	if (name.length <= length) return name;
	return `${name.substring(0, length / 2)}...${name.substring(
		name.length - length / 2,
		name.length
	)}`;
};

export const getInitials = string => {
	if (!string) {
		return "";
	}
	return string.split(" ").reduce((acc, curr) => {
		if (acc.length < 2) {
			return acc + curr[0].toUpperCase();
		}
		return acc;
	}, "");
};

export const getBrowserVersion = () => {
	const { userAgent } = navigator;
	let match =
		userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	let temp;

	match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, "-?"];
	temp = userAgent.match(/version\/(\d+)/i);

	if (temp !== null) {
		match.splice(1, 1, temp[1]);
	}

	return match[1] || null;
};

export const isSafari = () => navigator.userAgent.indexOf("Safari") > -1;

export const isFullScreen = () => {
	return !(
		!document.fullscreenElement &&
		!document.msFullscreenElement &&
		!document.mozFullScreenElement &&
		!document.webkitFullscreenElement
	);
};

export const fullScreenEnabled = () => {
	return (
		document.fullscreenEnabled ||
		document.msFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.webkitFullscreenEnabled
	);
};

export const addFullScreenEvent = callback => {
	let changeEventName;

	if (document.cancelFullScreen) {
		changeEventName = "fullscreenchange";
	} else if (document.webkitCancelFullScreen) {
		changeEventName = "webkitfullscreenchange";
	} else if (document.mozCancelFullScreen) {
		changeEventName = "mozfullscreenchange";
	} else if (document.msExitFullscreen) {
		changeEventName = "MSFullscreenChange";
	}

	if (changeEventName) {
		document.addEventListener(changeEventName, callback);
	}
};

export const loadBingApi = cb => {
	const callbackName = "bingAPIReady";
	const mapScript = document.querySelector('script[src*="bing.com/api/maps/mapcontrol"]');
	if (mapScript) {
		if (window.Microsoft && window.Microsoft.Maps) {
			// Bing Maps API is already loaded
			return cb();
		} else {
			// Bing Maps script is still loading, wait for the callback
			window[callbackName] = cb;
			return;
		}
	}

	const newMapScript = document.createElement("script");
	newMapScript.src = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}&key=${process.env.NEXT_PUBLIC_BING_MAPS_API}`;
	newMapScript.async = true;
	newMapScript.defer = true;

	window[callbackName] = cb;

	document.body.appendChild(newMapScript);
};
