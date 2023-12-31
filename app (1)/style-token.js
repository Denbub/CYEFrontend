const StyleDictionaryPackage = require("style-dictionary");
const { createArray } = require("./fns");

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
StyleDictionaryPackage.registerTransform({
	name: "sizes/px",
	type: "value",
	matcher: function (prop) {
		// You can be more specific here if you only want 'em' units for font sizes
		return ["fontSizes", "spacing", "borderRadius", "borderWidth", "sizing"].includes(
			prop.attributes.category
		);
	},
	transformer: function (prop) {
		// You can also modify the value here if you want to convert pixels to ems
		return parseFloat(prop.original.value) + "px";
	}
});

StyleDictionaryPackage.registerFormat({
	name: "css/variables",

	formatter: function (dictionary, config) {
		return `${this.selector} {\n${dictionary.allProperties
			.map(prop => `  --${prop.name}: ${prop.value}`)
			.join(";\n")}\n}`;
	}
});

StyleDictionaryPackage.registerFormat({
	name: "css/classFormat",
	formatter: function (dictionary, config) {
		const properties = dictionary.allProperties
			.map(prop => {
				const parsedName = prop.name.split("-");
				parsedName.shift();
				return `.${parsedName.join("-")} {
    font-family: ${prop.value.font.family};
    font-size: ${prop.value.font.size}px;
    font-weight: ${prop.value.font.weight};
    line-height: ${prop.value.line_height}px;
    letter-spacing: ${prop.value.letter_spacing}px;
};`;
			})
			.join("\n");

		return properties;
	}
});

StyleDictionaryPackage.registerFormat({
	name: "tw/component",
	formatter: function (dictionary, config) {
		return (
			"module.exports = " +
			`{\n${dictionary.allProperties
				.map(prop => {
					const parsedName = prop.name.split("-");
					parsedName.shift();
					return `
                    '.${parsedName.join("-")}': {
                        'font-family': '${prop.value.font.family}',
                        'font-size': '${prop.value.font.size}px',
                        'font-weight': '${prop.value.font.weight}',
                        'line-height': '${prop.value.line_height}px',
                        'letter-spacing': '${prop.value.letter_spacing}px'
                    }`;
				})
				.join(",\n")}}`
		);
	}
});

const formatValue = (tokenType, value) => {
	let formattedValue;
	switch (tokenType) {
		case "color":
		default:
			formattedValue = value;
	}
	return formattedValue;
};

StyleDictionaryPackage.registerFormat({
	name: "tw/css-variables",
	matcher: token => token.metadata.resource.type === "Color",
	formatter({ dictionary }) {
		return `module.exports = {\n${dictionary.allProperties
			.map(token => {
				const value = formatValue(token.type, token.value);
				const parsedName = token.name.split("-");
				parsedName.shift();
				return `    "${parsedName.join("-")}": "var(--${token.name}, ${value})"`;
			})
			.join(",\n")}\n}`;
	}
});

StyleDictionaryPackage.registerFilter({
	name: "text-styles",
	matcher: function (prop) {
		return prop.metadata.resource.type === "TextStyle";
	}
});

StyleDictionaryPackage.registerFilter({
	name: "colors",
	matcher: function (prop) {
		return prop.metadata.resource.type === "Color";
	}
});

function getStyleDictionaryConfig(theme) {
	return {
		source: [`src/styles/tokens/${theme}.json`],
		format: {
			createArray
		},
		platforms: {
			web: {
				transforms: ["attribute/cti", "name/cti/kebab", "sizes/px"],
				buildPath: `src/styles/output/`,
				files: [
					{
						destination: `${theme}.css`,
						format: "css/variables",
						selector: `.${theme}-theme`,
						filter: "colors"
					},
					{
						destination: `${theme}.js`,
						format: "tw/css-variables",
						filter: "colors"
					},
					{
						destination: `${theme}.css`,
						format: "css/classFormat",
						filter: "text-styles"
					},
					{
						destination: `${theme}.js`,
						format: "tw/component",
						filter: "text-styles"
					}
				]
			}
		}
	};
}

console.log("Build started...");

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

["colors", "text-styles"].map(function (theme) {
	console.log("\n==============================================");
	console.log(`\nProcessing: [${theme}]`);

	const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));

	StyleDictionary.buildPlatform("web");

	console.log("\nEnd processing");
});

console.log("\n==============================================");
console.log("\nBuild completed!");
