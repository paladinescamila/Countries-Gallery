import {createContext, useContext, useState} from 'react';

interface ContextProps {
	theme: Theme;
	toggleTheme: () => void;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
	const [theme, setTheme] = useState<Theme>('dark');
	const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	return <AppContext.Provider value={{theme, toggleTheme}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
