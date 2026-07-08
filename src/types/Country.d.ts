type Country = {
	code: {alpha2: string; alpha3: string};
	name: {common: string; native?: string};
	flagUrl: string;
	population?: number;
	region?: string;
	subregion?: string;
	capital?: string[];
	domains?: string;
	currencies?: string;
	languages?: string;
	borders?: string[];
};

type CountriesCollection = {[cca3: string]: Country};

type CountriesData = {array: Country[]; collection: CountriesCollection};
