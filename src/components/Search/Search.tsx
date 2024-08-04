import {useAppContext} from '../../context/AppContext';
import {MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import './Search.scss';

export default function Search() {
	const {search, setSearch} = useAppContext();

	return (
		<div className='search'>
			<MagnifyingGlassIcon className='search__icon' />
			<input
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Search for a country...'
				className='search__input'
			/>
		</div>
	);
}
