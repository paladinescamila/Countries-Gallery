import {useState} from 'react';
import './ImageWithFallback.scss';

type Props = {
	src?: string;
	alt?: string;
	className?: string;
	width?: number | string;
	height?: number | string;
};

export default function ImageWithFallback({src, alt, className, width, height}: Props) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	const handleLoad = () => {
		setLoaded(true);
		setError(false);
	};

	const handleError = () => {
		setError(true);
		setLoaded(false);
	};

	return (
		<span
			className={`${className ?? ''} image-with-fallback ${!loaded ? 'is-fallback' : ''}`}
			style={{width, height}}>
			<img
				className={`${className ?? ''} ${loaded ? 'loaded' : ''}`}
				src={src ?? ''}
				alt={alt ?? ''}
				width={width}
				height={height}
				onLoad={handleLoad}
				onError={handleError}
			/>
			{error && <span className='is-fallback__text'>No image</span>}
		</span>
	);
}
