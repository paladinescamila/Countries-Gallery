import {useAppContext} from '../../context/AppContext';
import './CountryCard.scss';

export default function CountryCard({country}: {country: Country}) {
	// Context
	const {goTo} = useAppContext();

	return (
		<li className='card' onClick={() => goTo(country)}>
			<img
				className='card__flag'
				src={country.flags.png}
				alt={`${country.name.common} flag`}
			/>
			<div className='card__info'>
				<p className='card__name'>{country.name.common}</p>
				{!!country.population && (
					<p className='card__prop'>
						<span>Population:</span>
						<span>{country.population.toLocaleString()}</span>
					</p>
				)}
				{country.region && (
					<p className='card__prop'>
						<span>Region:</span>
						<span>{country.region}</span>
					</p>
				)}
				{country.capital && (
					<p className='card__prop'>
						<span>Capital:</span>
						<span>{country.capital}</span>
					</p>
				)}
			</div>
		</li>
	);
}
