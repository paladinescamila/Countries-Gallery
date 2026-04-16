import {getFlag} from './flag';

/**
 * Fixes the country data by setting as undefined the properties that are empty objects
 * or empty strings, so they won't be rendered in the UI.
 * Also, it adds the flag property to the country object, so it can be used in the UI.
 */
export const fixCountryData = (country: Country): Country => {
	const fixedCountry = {...country};

	if (country.name?.nativeName && Object.keys(country.name.nativeName).length === 0)
		fixedCountry.name.nativeName = undefined;

	if (country.population === 0) fixedCountry.population = undefined;

	if (country.region === '') fixedCountry.region = undefined;

	if (country.subregion === '') fixedCountry.subregion = undefined;

	if (country.capital && country.capital.length === 0) fixedCountry.capital = undefined;

	if (country.tld && Object.keys(country.tld).length === 0) fixedCountry.tld = undefined;

	if (country.currencies && Object.keys(country.currencies).length === 0)
		fixedCountry.currencies = undefined;

	if (country.languages && Object.keys(country.languages).length === 0)
		fixedCountry.languages = undefined;

	if (country.borders && country.borders.length === 0) fixedCountry.borders = undefined;

	if (country.cca2) fixedCountry.flag = getFlag(country);

	return fixedCountry;
};

/**
 * Fixes the borders property of a country by setting it as undefined if it's an empty
 * array, so it won't be rendered in the UI.
 */
export const fixCountryBorders = (borders: string[] | undefined): string[] | undefined => {
	if (borders && borders.length === 0) return undefined;
	return borders;
};
