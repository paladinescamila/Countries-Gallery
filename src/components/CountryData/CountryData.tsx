import {useAppContext} from '../../context/AppContext';
import './CountryData.scss';

export default function CountryData() {
	const {currentCountry, countriesCollection, goTo} = useAppContext();

	if (currentCountry === null) return;

	const {
		flags,
		name,
		population,
		region,
		subregion,
		capital,
		tld,
		currencies,
		languages,
		borders,
	} = currentCountry;

	return (
		<div className='container'>
			<img className='flag' src={flags.png} />
			<div className='data'>
				<div className='name'>{name.common}</div>
				<div className='props'>
					<div className='props__left'>
						<p className='prop'>
							<span>Native Name:</span>
							<span>{Object.values(name.nativeName)[0].common}</span>
						</p>
						<p className='prop'>
							<span>Population:</span>
							<span>{population.toLocaleString()}</span>
						</p>
						<p className='prop'>
							<span>Region:</span>
							<span>{region}</span>
						</p>
						<p className='prop'>
							<span>Sub Region:</span>
							<span>{subregion}</span>
						</p>
						<p className='prop'>
							<span>Capital:</span>
							<span>{capital}</span>
						</p>
					</div>
					<div className='props__right'>
						<p className='prop'>
							<span>Top Level Domain:</span>
							<span>{Object.values(tld).join(', ')}</span>
						</p>
						<p className='prop'>
							<span>Currencies:</span>
							<span>
								{Object.values(currencies)
									.map((c) => c.name)
									.join(', ')}
							</span>
						</p>
						<p className='prop'>
							<span>Languages:</span>
							<span>
								{Object.values(languages)
									.sort((a, b) => a.localeCompare(b))
									.join(', ')}
							</span>
						</p>
					</div>
				</div>
				{borders && (
					<div className='border-countries'>
						<p>Border Countries:</p>
						<ul className='border-countries-list'>
							{borders.map(
								(b) =>
									countriesCollection[b] && (
										<li
											key={b}
											className='border-countries-list__item'
											onClick={() => goTo(countriesCollection[b])}>
											{countriesCollection[b].name.common}
										</li>
									)
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
