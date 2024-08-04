import {useState, useEffect} from 'react';
import COUNTRIES from '../../assets/data/data.json';
import {useAppContext} from '../../context/AppContext';
import './CountriesList.scss';

// Components
import CountryCard from '../CountryCard/CountryCard';
import {normalizeText} from '../../utils/text';

export default function CountriesList() {
	const {search, filterBy} = useAppContext();
	const [showedCountries, setShowedCountries] = useState<Country[]>(COUNTRIES as Country[]);

	useEffect(() => {
		let newShowedCountries = COUNTRIES as Country[];

		if (search) {
			const normalizedSearch = normalizeText(search);

			newShowedCountries = newShowedCountries.filter(
				(country) =>
					normalizeText(country.name).includes(normalizedSearch) ||
					normalizeText(country.nativeName).includes(normalizedSearch)
			);
		}

		if (filterBy) {
			newShowedCountries = newShowedCountries.filter(
				(country) => country.region === filterBy
			);
		}

		setShowedCountries(newShowedCountries);
	}, [search, filterBy]);

	if (showedCountries.length === 0 && search)
		return <p className='no-results'>No results found for "{search}"</p>;

	return (
		<ul className='cards'>
			{showedCountries.map((country) => (
				<CountryCard country={country as Country} />
			))}
		</ul>
	);
}
