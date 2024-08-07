/** Replaces accents and special characters, and converts to lowercase */
export const normalizeText = (text: string) =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
