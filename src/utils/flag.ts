/**
 * Generates the URL for a country's flag image based on its cca2 code.
 */
export const getFlag = (country: Country): string | undefined =>
	`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;
