import {useEffect, useMemo} from 'react';
import {useAppContext} from '../../context/AppContext';
import {loadCountries} from '../../utils/api';
import './CountriesList.scss';

// Components
import CountryCard from '../CountryCard/CountryCard';
import {normalizeText} from '../../utils/text';

export default function CountriesList() {
	// Context
	const {search, region, countries, setCountries, setCountriesCollection} = useAppContext();

	// Data loading
	useEffect(() => {
		loadCountries().then(({array, collection}) => {
			setCountries(array);
			setCountriesCollection(collection);
		});
	}, []);

	// Search and filter
	const showedCountries: Country[] = useMemo(() => {
		let newShowedCountries = countries;

		if (search) {
			const normalizedSearch = normalizeText(search);

			newShowedCountries = newShowedCountries.filter((country) =>
				normalizeText(country.name.common).includes(normalizedSearch),
			);
		}

		if (region) {
			newShowedCountries = newShowedCountries.filter((country) => country.region === region);
		}

		return newShowedCountries;
	}, [countries, search, region]);

	if (showedCountries.length === 0 && search)
		return <p className='no-results'>No results found for "{search}"</p>;

	return (
		<ul className='cards'>
			{showedCountries.map((country) => (
				<CountryCard
					key={`${country.code.alpha3}-${country.name.common}`}
					country={country as Country}
				/>
			))}
		</ul>
	);
}
