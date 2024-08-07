import {useAppContext} from '../../context/AppContext';
import './CountryCard.scss';

interface CountryCardProps {
	country: Country;
}

export default function CountryCard(props: CountryCardProps) {
	const {goTo} = useAppContext();
	const {country} = props;

	return (
		<li className='card' onClick={() => goTo(country)}>
			<img className='card__flag' src={country.flags.png} />
			<div className='card__info'>
				<p className='card__name'>{country.name.common}</p>
				<p className='card__prop'>
					<span>Population:</span>
					<span>{country.population.toLocaleString()}</span>
				</p>
				<p className='card__prop'>
					<span>Region:</span>
					<span>{country.region}</span>
				</p>
				<p className='card__prop'>
					<span>Capital:</span>
					<span>{country.capital}</span>
				</p>
			</div>
		</li>
	);
}
