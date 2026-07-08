/**
 * Generates the URL for a country's flag image based on its cca2 code.
 */
export const getFlag = (code: string): string | undefined =>
	`https://flagcdn.com/w320/${code.toLowerCase()}.png`;
