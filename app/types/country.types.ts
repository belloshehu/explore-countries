export interface CountryType {
	id: string;
	name: {
		common: string;
	};
	capital: string[];
	population: number;
	area: number;
	flags: {
		png: string;
	};
	continents: [string];
	languages: [any];
	currencies: [any];
}

export interface SectionType {
	title: keyof CountryType;
	data: string | number | string[];
}
