import {useState, useEffect} from 'react';
import {useAppContext} from '../../context/AppContext';
import {loadCountries} from '../../utils/api';
import './CountriesList.scss';

// Components
import CountryCard from '../CountryCard/CountryCard';
import {normalizeText} from '../../utils/text';

export default function CountriesList() {
	const {search, filterBy} = useAppContext();
	const [loading, setLoading] = useState<boolean>(false);
	const [countries, setCountries] = useState<Country[]>([]);
	const [showedCountries, setShowedCountries] = useState<Country[]>([]);

	useEffect(() => {
		setLoading(true);
		loadCountries().then((newCountries) => {
			setCountries(newCountries);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		let newShowedCountries = countries;

		if (search) {
			const normalizedSearch = normalizeText(search);

			newShowedCountries = newShowedCountries.filter((country) =>
				normalizeText(country.name.common).includes(normalizedSearch)
			);
		}

		if (filterBy) {
			newShowedCountries = newShowedCountries.filter(
				(country) => country.region === filterBy
			);
		}

		setShowedCountries(newShowedCountries);
	}, [countries, search, filterBy]);

	if (loading) return <p className='no-results'>Getting countries...</p>;

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
