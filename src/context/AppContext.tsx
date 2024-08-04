import {createContext, useContext, useState} from 'react';

interface ContextProps {
	theme: Theme;
	toggleTheme: () => void;
	search: string;
	setSearch: (search: string) => void;
	filterBy: FilterBy | null;
	setFilterBy: (filterBy: FilterBy | null) => void;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
	const [theme, setTheme] = useState<Theme>('dark');
	const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	const [search, setSearch] = useState<string>('');
	const [filterBy, setFilterBy] = useState<FilterBy | null>(null);

	return (
		<AppContext.Provider value={{theme, toggleTheme, search, setSearch, filterBy, setFilterBy}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
