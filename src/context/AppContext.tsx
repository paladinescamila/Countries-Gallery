import {createContext, useContext, useState} from 'react';
import {COUNTRIES, COUNTRIES_COLLECTION} from '../constants/countries';

interface ContextProps {
	theme: Theme;
	toggleTheme: () => void;
	search: string;
	setSearch: (search: string) => void;
	region: Region | null;
	setRegion: (region: Region | null) => void;
	countries: Country[];
	setCountries: (countries: Country[]) => void;
	countriesCollection: CountriesCollection;
	setCountriesCollection: (collection: CountriesCollection) => void;
	currentCountry: Country | null;
	goTo: (country: Country) => void;
	goBack: () => void;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
	// Theme
	const [theme, setTheme] = useState<Theme>('light');
	const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	// Search and filter
	const [search, setSearch] = useState<string>('');
	const [region, setRegion] = useState<Region | null>(null);

	// Data
	const [countries, setCountries] = useState<Country[]>(COUNTRIES);

	const [countriesCollection, setCountriesCollection] =
		useState<CountriesCollection>(COUNTRIES_COLLECTION);

	// Navigation
	const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
	const [navigationPath, setNavigationPath] = useState<Country[]>([]);

	const goTo = (country: Country) => {
		setCurrentCountry(country);
		setNavigationPath((prev) => [...prev, country]);
	};

	const goBack = () => {
		const newNavigationPath = [...navigationPath];
		newNavigationPath.pop();
		setNavigationPath(newNavigationPath);

		if (newNavigationPath.length > 0)
			setCurrentCountry(newNavigationPath[newNavigationPath.length - 1]);
		else setCurrentCountry(null);
	};

	return (
		<AppContext.Provider
			value={{
				theme,
				toggleTheme,
				search,
				setSearch,
				region,
				setRegion,
				countries,
				setCountries,
				countriesCollection,
				setCountriesCollection,
				currentCountry,
				goTo,
				goBack,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
