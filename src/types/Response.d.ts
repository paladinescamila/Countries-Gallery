type RestCountriesResponse = {
	data: {
		objects: ResponseCountry[];
		meta: ResponseMeta;
	};
};

type ResponseMeta = {
	total: number;
	count: number;
	limit: number;
	offset: number;
	more: boolean;
	request_id: string;
	duration: number;
};

type ResponseCountry = {
	names: {
		alternates: string[];
		common: string;
		native: Record<string, string | {common: string; official: string}>;
		official: string;
		translations: Record<string, string>;
	};
	codes: {
		alpha_2: string;
		alpha_3: string;
		ccn3: string;
		cioc: string;
		fifa: string;
		fips: string;
		gec: string;
	};
	capitals: Array<{
		name?: string;
		lat?: number;
		lng?: number;
		[key: string]: unknown;
	}>;
	flag: {
		colors: Record<string, string>;
		description: string;
		emoji: string;
		html_entity: string;
		unicode: string;
		url_png: string;
		url_svg: string;
	};
	region: string;
	subregion: string;
	area: {
		kilometers: number;
		miles: number;
	};
	assets: unknown[];
	borders: string[];
	calling_codes: string[];
	cars: {
		driving_side: 'left' | 'right';
		signs: string[];
	};
	classification: {
		dependency: boolean;
		dependency_type: string;
		disputed: boolean;
		iso_status: string;
		sovereign: boolean;
		un_member: boolean;
		un_observer: boolean;
	};
	continents: string[];
	coordinates: {
		lat: number;
		lng: number;
	};
	currencies: Array<{
		code?: string;
		name?: string;
		symbol?: string;
		[key: string]: unknown;
	}>;
	date: {
		academic_year_start: {
			month: number;
			[key: string]: unknown;
		};
		fiscal_year_start: Record<string, unknown>;
		start_of_week: string;
	};
	demonyms: Record<
		string,
		{
			f?: string;
			m?: string;
			[key: string]: unknown;
		}
	>;
	economy: {
		gini_coefficient: Record<string, unknown>;
	};
	government_type: string;
	landlocked: boolean;
	languages: Array<{
		iso?: string;
		name?: string;
		native_name?: string;
		[key: string]: unknown;
	}>;
	leaders: Array<Record<string, unknown>>;
	links: {
		google_maps: string;
		official: string;
		open_street_maps: string;
		wikipedia: string;
	};
	memberships: Record<string, boolean>;
	number_format: {
		decimal_separator: string;
		thousands_separator: string;
	};
	parent: {
		alpha_2: string;
		alpha_3: string;
	};
	population: number;
	postal_code: {
		format: string;
		regex: string;
	};
	timezones: string[];
	tlds: string[];
	units: {
		measurement_system: string;
		temperature_scale: string;
	};
	uuid: string;
	_meta: {
		lastUpdatedTimestamp: number;
	};
};
