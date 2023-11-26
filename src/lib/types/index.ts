export interface Profile {
	id: number;
	userId: string;
	company: string;
	website: string;
	logo: string;
	logoBackground: string;
	location: string;
	bio?: string;
	created_at: string;
}


export interface EntityWithId {
	id: string;
}

export interface AnyProp {
	[anyProp: string]: unknown;
}
