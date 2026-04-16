type Country = {
	cca2: string;
	cca3: string;
	flag?: string;
	name: {
		common: string;
		official: string;
		nativeName?: Record<string, {official: string; common: string}>;
	};
	population?: number;
	region?: string;
	subregion?: string;
	capital?: string[];
	tld?: string[];
	currencies?: Record<string, {name: string; symbol: string}>;
	languages?: Record<string, string>;
	borders?: string[];
};

type CountriesCollection = {[cca3: string]: Country};
