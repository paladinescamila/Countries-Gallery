import {useEffect, useRef, useState} from 'react';
import {useAppContext} from '../../context/AppContext';
import {ChevronDownIcon, XMarkIcon} from '@heroicons/react/24/solid';
import './Filter.scss';

export default function Filter() {
	// Context
	const {region, setRegion} = useAppContext();

	// Filter handling
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const toggleOptions = () => setShowOptions((prev) => !prev);

	const selectOption = (option: Region) => {
		setRegion(option);
		setShowOptions(false);
	};

	const clearFilter = () => {
		setRegion(null);
		setTimeout(() => setShowOptions(false), 100);
	};

	// Hide options on click outside
	const filterRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (filterRef.current && !filterRef.current.contains(event.target as Node))
				setShowOptions(false);
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='filter' ref={filterRef}>
			<div className='filter-button' onClick={toggleOptions}>
				<p className='filter-button__text'>
					{region ? `Region: ${region}` : 'Filter by Region'}
				</p>
				{region ? (
					<XMarkIcon className='filter-button__icon' onClick={clearFilter} />
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
