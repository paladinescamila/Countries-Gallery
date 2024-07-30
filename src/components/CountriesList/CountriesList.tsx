import COUNTRIES from '../../assets/data/data.json';
import './CountriesList.scss';

// Components
import CountryCard from '../CountryCard/CountryCard';

export default function CountriesList() {
	return (
		<ul className='cards'>
			{COUNTRIES.map((country) => (
				<CountryCard country={country as Country} />
			))}
		</ul>
	);
}
