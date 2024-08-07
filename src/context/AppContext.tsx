import {createContext, useContext, useState} from 'react';

interface ContextProps {
	theme: Theme;
	toggleTheme: () => void;
	search: string;
	setSearch: (search: string) => void;
	filterBy: FilterBy | null;
	setFilterBy: (filterBy: FilterBy | null) => void;
	countriesCollection: CountriesCollection;
	setCountriesCollection: (collection: CountriesCollection) => void;
	currentCountry: Country | null;
	goTo: (country: Country) => void;
	goBack: () => void;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
	const [theme, setTheme] = useState<Theme>('dark');
	const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	const [search, setSearch] = useState<string>('');
	const [filterBy, setFilterBy] = useState<FilterBy | null>(null);

	const [countriesCollection, setCountriesCollection] = useState<CountriesCollection>({});
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
				filterBy,
				setFilterBy,
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
