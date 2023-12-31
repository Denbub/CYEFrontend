import { useEffect, useRef } from "react";

const useAutosuggest = ({ inputRef, suggestionsContainerRef, onAddressSelect, bingApiReady }) => {
	const timeoutId = useRef(null);

	useEffect(() => {
		if (inputRef.current && suggestionsContainerRef.current && bingApiReady) {
			timeoutId.current && clearInterval(timeoutId.current);
			const selectedSuggestion = suggestionResult => {
				if (onAddressSelect) {
					const location = suggestionResult.location;
					onAddressSelect({
						address: suggestionResult.address.formattedAddress,
						location: { lat: location.latitude, lng: location.longitude }
					});
				}
			};
			Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", () => {
				const manager = new Microsoft.Maps.AutosuggestManager({
					maxResults: 5
				});
				manager.attachAutosuggest(
					inputRef.current,
					suggestionsContainerRef.current,
					selectedSuggestion
				);
			});
			inputRef.current.setAttribute("autocomplete", "off");
		}
	}, [bingApiReady, inputRef.current, suggestionsContainerRef.current]);

	useEffect(
		() => () => {
			timeoutId.current && clearInterval(timeoutId.current);
		},
		[]
	);

	return null;
};

export default useAutosuggest;
