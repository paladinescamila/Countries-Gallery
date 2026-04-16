import axios from 'axios';
import {fixCountryBorders, fixCountryData} from './fix';

const URL = 'https://restcountries.com/v3.1/all';
const fields = 'cca2,cca3,name,population,region,subregion,capital,tld,currencies,languages';

/**
 * Loads the countries data from the API and returns it as an array and a collection. */
export const loadCountries = async () => {
	try {
		const response = await axios.get<Country[]>(`${URL}?fields=${fields}`);
		const responseWithBorders = await axios.get<Country[]>(`${URL}?fields=cca3,borders`);

		let array = response.data
			.map(fixCountryData)
			.sort((a, b) => a.name.common.localeCompare(b.name.common));

		let collection: CountriesCollection = {};

		array.forEach((country) => (collection[country.cca3] = country));
		responseWithBorders.data.forEach(({cca3, borders}) => (collection[cca3].borders = borders));

		array = array.map((country) => ({
			...country,
			borders: fixCountryBorders(collection[country.cca3].borders),
		}));

		return {array, collection};
	} catch (error) {
		console.error('Error loading countries:', error);
		return {array: [], collection: {}};
	}
};
