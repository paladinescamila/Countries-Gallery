import axios from 'axios';

const URL = 'https://restcountries.com/v3.1/all';
const fields = 'cca3,flags,name,population,region,subregion,capital,tld,currencies,languages';

export const loadCountries = async () => {
	const response = await axios.get<Country[]>(`${URL}?fields=${fields}`);
	const responseWithBorders = await axios.get<Country[]>(`${URL}?fields=cca3,borders`);

	let array = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
	let collection: CountriesCollection = {};

	array.forEach((country) => (collection[country.cca3] = country));
	responseWithBorders.data.forEach(({cca3, borders}) => (collection[cca3].borders = borders));
	array = array.map((country) => ({...country, borders: collection[country.cca3].borders || []}));

	return {array, collection};
};
