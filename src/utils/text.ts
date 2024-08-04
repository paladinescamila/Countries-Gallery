export const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);

export const normalizeText = (text: string) =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
