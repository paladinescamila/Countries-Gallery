import axios from 'axios';

const URL = 'https://restcountries.com/v3.1/all';

export const loadCountries = async () => {
	const response = await axios.get(URL);
	return response.data;
};
