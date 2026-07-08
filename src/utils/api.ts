import axios from 'axios';
import {fixCountryData} from './fix';
import {COUNTRIES, COUNTRIES_COLLECTION} from '../constants/countries';

const API_URL = 'https://api.restcountries.com/countries/v5';
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Loads the countries data from the API. */
const load = async () => {
	try {
		let array: Country[] = [];

		for (let offset = 0; offset < 300; offset += 100) {
			const response = await axios.get<RestCountriesResponse>(API_URL, {
				params: {limit: 100, offset},
				headers: {Authorization: `Bearer ${API_KEY}`},
			});

			array.push(...response.data.data.objects.map(fixCountryData));
		}

		array = array.sort((a, b) => a.name.common.localeCompare(b.name.common));

		const collection: CountriesCollection = {};
		array.forEach((country) => (collection[country.code.alpha3] = country));

		return {array, collection};
	} catch (error) {
		console.error('Error loading countries:', error);
		return {array: COUNTRIES, collection: COUNTRIES_COLLECTION};
	}
};

let promiseCache: Promise<{array: Country[]; collection: CountriesCollection}> | null = null;
let dataCache: {array: Country[]; collection: CountriesCollection} | null = null;

/**
 * Loads the countries data from the API and returns it as an array and a collection. */
export const loadCountries = async () => {
	if (dataCache) return dataCache;

	if (promiseCache) return promiseCache;

	const promise = load().then((data) => {
		dataCache = data;
		return data;
	});

	promiseCache = promise;

	return promise;
};
