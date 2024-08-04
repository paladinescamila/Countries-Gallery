import {useEffect, useRef, useState} from 'react';
import {useAppContext} from '../../context/AppContext';
import {ChevronDownIcon, XMarkIcon} from '@heroicons/react/24/solid';
import './Filter.scss';

export default function Filter() {
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const toggleOptions = () => setShowOptions((prev) => !prev);
	const {filterBy, setFilterBy} = useAppContext();

	const deleteFilter = () => {
		setFilterBy(null);
		setTimeout(() => setShowOptions(false), 100);
	};

	const selectOption = (option: FilterBy) => {
		setFilterBy(option);
		setShowOptions(false);
	};

	const filterRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
				setShowOptions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='filter' ref={filterRef}>
			<div className='filter-button' onClick={toggleOptions}>
				<p className='filter-button__text'>
					{filterBy ? `Region: ${filterBy}` : 'Filter by Region'}
				</p>
				{filterBy ? (
					<XMarkIcon className='filter-button__icon' onClick={deleteFilter} />
				) : (
					<ChevronDownIcon className='filter-button__icon' />
				)}
			</div>
			{showOptions && (
				<ul className='filter-options'>
					<li onClick={() => selectOption('Africa')}>Africa</li>
					<li onClick={() => selectOption('Americas')}>Americas</li>
					<li onClick={() => selectOption('Asia')}>Asia</li>
					<li onClick={() => selectOption('Europe')}>Europe</li>
					<li onClick={() => selectOption('Oceania')}>Oceania</li>
				</ul>
			)}
		</div>
	);
}
