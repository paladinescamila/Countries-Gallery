import {useAppContext} from './context/AppContext';
import './styles/App.scss';

import Header from './components/Header/Header';
import CountriesList from './components/CountriesList/CountriesList';

function App() {
	const {theme} = useAppContext();

	return (
		<div className={`app theme--${theme}`}>
			<Header />
			<CountriesList />
		</div>
	);
}

export default App;
