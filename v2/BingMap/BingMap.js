import clsx from "clsx";
import { useEffect, useRef } from "react";

import { addFullScreenEvent, fullScreenEnabled, isFullScreen } from "utilities";

import EditButton from "components/v2/EditButton";

const pinIcon =
	'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"><path fill="#E50505" d="M17.175 14.08a2.02 2.02 0 0 0 0-2.828 1.954 1.954 0 0 0-2.79 0 2.02 2.02 0 0 0 0 2.828c.77.781 2.02.781 2.79 0z"/><path fill="#E50505" fill-rule="evenodd" d="M15.78 2.666c-5.77 0-10.463 4.71-10.52 10.56 0 7.294 9.239 15.412 9.663 15.785l.002.002a1.301 1.301 0 0 0 1.71 0c.46-.347 9.666-8.48 9.666-15.787-.058-5.85-4.751-10.56-10.52-10.56zm0 14.667c-2.542 0-4.602-2.09-4.602-4.667s2.06-4.667 4.602-4.667c2.542 0 4.603 2.09 4.603 4.667s-2.06 4.667-4.603 4.667z" clip-rule="evenodd"/></svg>';

const transparentPinIcon =
	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#171717" fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" clip-rule="evenodd"/><path fill="#171717" fill-rule="evenodd" d="M12 2a8 8 0 0 0-8 7.92c0 5.47 7.025 11.559 7.348 11.839l.002.001a1 1 0 0 0 1.3 0C13 21.5 20 15.4 20 9.92A8 8 0 0 0 12 2zm0 17.65c-1.67-1.59-6-6-6-9.73a6 6 0 1 1 12 0c0 3.7-4.33 8.14-6 9.73z" clip-rule="evenodd"/></svg>';

const BingMap = ({
	mapOptions = {},
	mapClassName,
	radius,
	address,
	bingApiReady,
	locations,
	serviceName
}) => {
	const mapRef = useRef(null);
	const mapContainerRef = useRef(null);
	const mapInstanceRef = useRef(null);
	const fullScreenToggleRef = useRef(null);
	const infoboxes = useRef([]);

	const zoomIn = () => {
		const map = mapInstanceRef.current;
		map && map.setView({ zoom: map.getZoom() + 1 });
	};

	const zoomOut = () => {
		const map = mapInstanceRef.current;
		map && map.setView({ zoom: map.getZoom() - 1 });
	};

	const toggleFullScreen = () => {
		if (isFullScreen()) {
			const closeFullScreenFn =
				document.cancelFullScreen ||
				document.webkitCancelFullScreen ||
				document.mozCancelFullScreen ||
				document.msExitFullscreen;

			closeFullScreenFn.call(document);
		} else {
			const openFullScreenFn =
				mapContainerRef.current.requestFullScreen ||
				mapContainerRef.current.webkitRequestFullScreen ||
				mapContainerRef.current.mozRequestFullScreen ||
				mapContainerRef.current.msRequestFullscreen;

			openFullScreenFn.call(mapContainerRef.current);
		}
	};

	const createCircle = (center, radius, map) => {
		if (center && radius && map) {
			Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", () => {
				const circle = Microsoft.Maps.SpatialMath.getRegularPolygon(
					center,
					radius * 1000,
					100,
					Microsoft.Maps.SpatialMath.Kilometers
				);
				map.entities.push(
					new Microsoft.Maps.Polygon(circle, {
						strokeColor: "rgba(229, 5, 5, 0.3)",
						strokeThickness: 1,
						fillColor: "rgba(253, 165, 165, 0.3)"
					})
				);
			});
		}
	};

	const createPushpin = (center, map, multiplePushPins) => {
		if (center && map) {
			const pushpin = new Microsoft.Maps.Pushpin(center, {
				icon: multiplePushPins ? transparentPinIcon : pinIcon
			});
			map.entities.push(pushpin);
			return pushpin;
		}
	};

	const createInfoBox = ({ pushpin, description, title, map }) => {
		if (pushpin && map && (description || title)) {
			const pushpinHeight = 32;
			const infobox = new Microsoft.Maps.Infobox(pushpin.getLocation(), {
				title,
				description,
				visible: false
			});

			Microsoft.Maps.Events.addHandler(pushpin, "click", () => {
				const pixel = map.tryLocationToPixel(
					pushpin.getLocation(),
					Microsoft.Maps.PixelReference.control
				);

				const offsetLocation = map.tryPixelToLocation(
					new Microsoft.Maps.Point(pixel.x, pixel.y - pushpinHeight),
					Microsoft.Maps.PixelReference.control
				);
				infobox.setOptions({ location: offsetLocation, visible: true });
			});

			map.entities.push(infobox);
			return infobox;
		}
	};

	const getDataByAddress = (address, radius) => {
		const map = mapInstanceRef.current;
		if (address && map) {
			Microsoft.Maps.loadModule("Microsoft.Maps.Search", function () {
				const searchManager = new Microsoft.Maps.Search.SearchManager(map);
				searchManager.geocode({
					bounds: map.getBounds(),
					where: address,
					callback: answer => {
						const centerCoords = answer.results[0].location;
						map.setView({ bounds: answer.results[0].bestView });
						map.entities.clear();
						const pushpin = createPushpin(centerCoords, map);
						createCircle(centerCoords, radius, map);
						createInfoBox({ pushpin, title: serviceName || address, map });
					}
				});
			});
		}
	};

	const addMultiplePushpins = (locations, map) => {
		if (locations?.length && map) {
			map.entities.clear();

			if (infoboxes.current.length) {
				infoboxes.current.forEach(infobox => infobox.setOptions({ visible: false }));
				infoboxes.current = [];
			}

			const boundingLocations = locations.reduce((acc, { lat, lng }) => {
				if (lat && lng) {
					acc.push(new Microsoft.Maps.Location(lat, lng));
				}
				return acc;
			}, []);

			if (boundingLocations.length) {
				const boundingBox = Microsoft.Maps.LocationRect.fromLocations(boundingLocations);

				map.setView({ bounds: boundingBox });
			}

			locations.forEach(({ lat, lng, title }) => {
				if (lat && lng) {
					const pushpin = createPushpin(new Microsoft.Maps.Location(lat, lng), map, true);
					const infobox = createInfoBox({ pushpin, title, map });
					if (infobox) {
						infoboxes.current.push(infobox);
					}
				}
			});
		}
	};

	useEffect(() => {
		if (bingApiReady && !mapInstanceRef.current) {
			mapInstanceRef.current = new Microsoft.Maps.Map(document.getElementById("bingMap"), {
				mapTypeId: Microsoft.Maps.MapTypeId.grayscale,
				showDashboard: false,
				showScalebar: false,
				showTermsLink: false,
				...mapOptions
			});

			if (address) {
				getDataByAddress(address, radius);
			}
		}
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.dispose();
				mapInstanceRef.current = null;
			}
		};
	}, [bingApiReady]);

	useEffect(() => {
		if (mapRef.current) {
			if (fullScreenEnabled) {
				addFullScreenEvent(() => {
					if (isFullScreen()) {
						mapRef.current?.classList.add("fullScreen");
					} else {
						mapRef.current?.classList.remove("fullScreen");
					}
				});
			} else {
				fullScreenToggleRef.current.disabled = true;
			}
		}
	}, [mapRef.current]);

	useEffect(() => {
		getDataByAddress(address, radius);
	}, [address, radius]);

	useEffect(() => {
		const map = mapInstanceRef.current;
		addMultiplePushpins(locations, map);
	}, [locations, mapInstanceRef.current]);

	if (!bingApiReady) {
		return null;
	}

	return (
		<div ref={mapContainerRef} className='relative h-full w-full'>
			<div
				id='bingMap'
				ref={mapRef}
				className={clsx("relative h-full min-h-[320px] w-full", mapClassName)}
			/>
			<EditButton
				innerRef={fullScreenToggleRef}
				onClick={toggleFullScreen}
				className='absolute top-md right-md'
				size={40}
				iconName='zoom'
			/>
			<div className='absolute bottom-md left-md z-[100] flex'>
				<EditButton className='mr-md' onClick={zoomOut} size={40} iconName='minus' />
				<EditButton onClick={zoomIn} size={40} iconName='plus' />
			</div>
		</div>
	);
};

export default BingMap;
