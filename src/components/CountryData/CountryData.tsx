import {useAppContext} from '../../context/AppContext';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback';
import './CountryData.scss';

export default function CountryData() {
	// Context
	const {currentCountry, countriesCollection, goTo} = useAppContext();

	if (currentCountry === null) return;

	// Country data
	const {flagUrl, name, borders} = currentCountry;

	const {population, region, subregion, capital, domains, currencies, languages} = currentCountry;

	return (
		<div className='container'>
			<ImageWithFallback
				className='flag'
				src={flagUrl}
				alt={`${currentCountry.name.common} flag`}
			/>
			<div className='data'>
				<div className='name'>{name.common}</div>
				<div className='props'>
					<div className='props__left'>
						{name.native && (
							<p className='prop'>
								<span>Native Name:</span>
								<span>{name.native}</span>
							</p>
						)}
						{!!population && (
							<p className='prop'>
								<span>Population:</span>
								<span>{population.toLocaleString()}</span>
							</p>
						)}
						{region && (
							<p className='prop'>
								<span>Region:</span>
								<span>{region}</span>
							</p>
						)}
						{subregion && (
							<p className='prop'>
								<span>Sub Region:</span>
								<span>{subregion}</span>
							</p>
						)}
						{capital && (
							<p className='prop'>
								<span>Capital:</span>
								<span>{capital}</span>
							</p>
						)}
					</div>
					<div className='props__right'>
						{domains && (
							<p className='prop'>
								<span>Domains:</span>
								<span>{domains}</span>
							</p>
						)}
						{currencies && (
							<p className='prop'>
								<span>Currencies:</span>
								<span>{currencies}</span>
							</p>
						)}
						{languages && (
							<p className='prop'>
								<span>Languages:</span>
								<span>{languages}</span>
							</p>
						)}
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
									),
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
