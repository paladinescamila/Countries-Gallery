import {useAppContext} from './context/AppContext';
import './styles/App.scss';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Filter from './components/Filter/Filter';
import CountriesList from './components/CountriesList/CountriesList';

function App() {
	const {theme} = useAppContext();

	return (
		<div className={`app theme--${theme}`}>
			<Header />
			<div className='search-and-filter'>
				<Search />
				<Filter />
			</div>
			<CountriesList />
		</div>
	);
}

export default App;
