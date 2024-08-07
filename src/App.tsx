import {useAppContext} from './context/AppContext';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import './styles/App.scss';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Filter from './components/Filter/Filter';
import CountriesList from './components/CountriesList/CountriesList';
import CountryData from './components/CountryData/CountryData';

function App() {
	const {theme, currentCountry, goBack} = useAppContext();

	return (
		<div className={`app theme--${theme}`}>
			<Header />
			{currentCountry ? (
				<>
					<div className='go-back' onClick={goBack}>
						<ArrowLeftIcon className='go-back__icon' />
						<p className='go-back__text'>Back</p>
					</div>
					<CountryData />
				</>
			) : (
				<>
					<div className='search-and-filter'>
						<Search />
						<Filter />
					</div>
					<CountriesList />
				</>
			)}
		</div>
	);
}

export default App;
