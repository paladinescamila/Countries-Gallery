import {useAppContext} from '../../context/AppContext';
import {MoonIcon as MoonIconSolid} from '@heroicons/react/24/solid';
import {MoonIcon as MoonIconOutline} from '@heroicons/react/24/outline';
import './Header.scss';

export default function Header() {
	// Context
	const {theme, toggleTheme} = useAppContext();

	return (
		<header className='header'>
			<h1 className='header__title'>Where in the world?</h1>
			<div className='theme-switch' onClick={toggleTheme}>
				{theme === 'dark' ? (
					<MoonIconSolid className='theme-switch__icon' />
				) : (
					<MoonIconOutline className='theme-switch__icon' />
				)}
				<p className='theme-switch__text'>Dark Mode</p>
			</div>
		</header>
	);
}
