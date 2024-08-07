import axios from 'axios';

const URL = 'https://restcountries.com/v3.1/all';

export const loadCountries = async () => {
	const response = await axios.get<Country[]>(URL);
	const countriesArray = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
	const countriesCollection: CountriesCollection = {};

	for (const country of countriesArray) {
		countriesCollection[country.cca3] = country;
	}

	return {countriesArray, countriesCollection};
};
