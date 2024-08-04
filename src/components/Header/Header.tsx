import {useAppContext} from '../../context/AppContext';
import {capitalize} from '../../utils/text';
import {MoonIcon} from '@heroicons/react/24/solid';
import './Header.scss';

export default function Header() {
	const {theme, toggleTheme} = useAppContext();

	return (
		<header className='header'>
			<h1 className='header__title'>Where in the world?</h1>
			<div className='theme-switch' onClick={toggleTheme}>
				<MoonIcon className='theme-switch__icon' />
				<p className='theme-switch__text'>{capitalize(theme)} Mode</p>
			</div>
		</header>
	);
}
