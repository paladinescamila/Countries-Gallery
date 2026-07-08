import {getFlag} from './flag';

/**
 * Normalizes the API response into the frontend country model.
 */
export const fixCountryData = (country: ResponseCountry): Country => {
	const nativeNames = Object.values(country.names.native);

	const nativeName =
		typeof nativeNames[0] === 'string' ? nativeNames[0] : (nativeNames[0]?.common ?? '');

	const capital = country.capitals.map((entry) => entry.name).filter(Boolean) as string[];

	const currencies = country.currencies
		.map((currency) => currency.name ?? currency.code ?? '')
		.filter(Boolean) as string[];

	const languages = (
		country.languages.map((language) => language.name).filter(Boolean) as string[]
	).sort((a, b) => a.localeCompare(b));

	return {
		code: {alpha2: country.codes.alpha_2, alpha3: country.codes.alpha_3},
		flagUrl: country.flag.url_png || getFlag(country.codes.alpha_2) || '',
		name: {common: country.names.common, native: nativeName},
		population: country.population,
		region: country.region || undefined,
		subregion: country.subregion || undefined,
		capital: capital.length > 0 ? capital : undefined,
		domains: country.tlds.length > 0 ? country.tlds.join(', ') : undefined,
		currencies: currencies.length > 0 ? currencies.join(', ') : undefined,
		languages: languages.length > 0 ? languages.join(', ') : undefined,
		borders: country.borders.length > 0 ? country.borders : undefined,
	};
};
