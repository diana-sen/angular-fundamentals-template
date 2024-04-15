export interface CourseData {
	id?: string;
	title: string;
	description: string;
	creationDate?: Date;
	duration: number;
	authors: string[];
}

export interface User {
	name?: string;
	email: string;
	password?: string;
}

export interface TokenResponse {
	successful: boolean;
	result: string;
	user?: User;
}

export interface Author {
	name: string;
	id?: string;
}