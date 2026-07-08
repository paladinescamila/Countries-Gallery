import axios from 'axios';
import {fixCountryData} from './fix';
import {COUNTRIES, COUNTRIES_COLLECTION} from '../constants/countries';

const API_URL = 'https://api.restcountries.com/countries/v5';
const API_KEY = import.meta.env.VITE_API_KEY;
const COUNTRIES_CACHE_KEY = 'countries-gallery:countries-cache';

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

/** Reads the cached countries data from localStorage, if available. */
const readCachedCountries = (): CountriesData | null => {
	if (typeof window === 'undefined') return null;

	try {
		const cachedValue = window.localStorage.getItem(COUNTRIES_CACHE_KEY);
		if (!cachedValue) return null;

		return JSON.parse(cachedValue) as CountriesData;
	} catch (error) {
		console.error('Error reading countries cache:', error);
		return null;
	}
};

const writeCachedCountries = (data: CountriesData) => {
	if (typeof window === 'undefined') return;

	try {
		window.localStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify(data));
	} catch (error) {
		console.error('Error saving countries cache:', error);
	}
};

let promiseCache: Promise<CountriesData> | null = null;

/**
 * Loads the countries data from the API and returns it as an array and a collection. */
export const loadCountries = async () => {
	const cachedCountries = readCachedCountries();

	if (cachedCountries) return cachedCountries;
	if (promiseCache) return promiseCache;

	const promise = load().then((data) => {
		writeCachedCountries(data);
		return data;
	});

	promiseCache = promise;

	return promise;
};
