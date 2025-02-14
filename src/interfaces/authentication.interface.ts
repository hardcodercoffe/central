export type Role = "USER" | "ADMIN";
export interface IUserRegister {
	username: string;
	email: string;
	password: string;
}
export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUserResponse {
	id: string;
	email: string;
	username: string;
	balance: number;
	telegramId: bigint | null;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
}
export interface IErrorClient {
	code: number;
	status: string;
	message: string;
}
