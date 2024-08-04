import {useAppContext} from '../../context/AppContext';
import {capitalize} from '../../utils/capitalize';
import './Header.scss';

export default function Header() {
	const {theme, toggleTheme} = useAppContext();

	return (
		<header className='header'>
			<h1>Where in the world?</h1>
			<div className='theme-switch' onClick={toggleTheme}>
				<p>{capitalize(theme)} Mode</p>
			</div>
		</header>
	);
}
