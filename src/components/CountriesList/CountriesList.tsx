import {useState, useEffect, useMemo} from 'react';
import {useAppContext} from '../../context/AppContext';
import {loadCountries} from '../../utils/api';
import './CountriesList.scss';

// Components
import CountryCard from '../CountryCard/CountryCard';
import {normalizeText} from '../../utils/text';

export default function CountriesList() {
	// Context
	const {search, region, setCountriesCollection} = useAppContext();

	// Data loading
	const [loading, setLoading] = useState<boolean>(false);
	const [countries, setCountries] = useState<Country[]>([]);

	useEffect(() => {
		setLoading(true);
		loadCountries().then(({countriesArray, countriesCollection}) => {
			setCountries(countriesArray);
			setCountriesCollection(countriesCollection);
			setLoading(false);
		});
	}, [setCountriesCollection]);

	// Search and filter
	const showedCountries: Country[] = useMemo(() => {
		let newShowedCountries = countries;

		if (search) {
			const normalizedSearch = normalizeText(search);

			newShowedCountries = newShowedCountries.filter((country) =>
				normalizeText(country.name.common).includes(normalizedSearch)
			);
		}

		if (region) {
			newShowedCountries = newShowedCountries.filter((country) => country.region === region);
		}

		return newShowedCountries;
	}, [countries, search, region]);

	if (loading) return <p className='no-results'>Getting countries...</p>;

	if (showedCountries.length === 0 && search)
		return <p className='no-results'>No results found for "{search}"</p>;

	return (
		<ul className='cards'>
			{showedCountries.map((country) => (
				<CountryCard key={country.cca3} country={country as Country} />
			))}
		</ul>
	);
}
