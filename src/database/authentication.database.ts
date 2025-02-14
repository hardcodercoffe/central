import Prisma from "./connection.database";
import type {
	IUserRegister,
	IUserResponse,
} from "../interfaces/authentication.interface";

export interface IDatabase {
	create(data: IUserRegister): Promise<IUserResponse>;
	findUser(data: string | number, field: string): Promise<IUserResponse | null>;
	// login(data:IUserLogin):Promise<IUserResponse | null>
}

class Database implements IDatabase {
	create(data: IUserRegister): Promise<IUserResponse> {
		const createUser = Prisma.user.create({
			data,
		});
		return createUser;
	}
	async findUser(
		data: string | number,
		field: "email" | "username" | "telegramId" | "id",
	): Promise<IUserResponse | null> {
		// biome-ignore lint/style/useConst: <explanation>
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let query: any = "";

		if (field === "username") {
			query = { username: data };
		} else if (field === "email") {
			query = { email: data };
		} else if (field === "telegramId") {
			query = { telegramId: data };
		} else if (field === "id") {
			query = { id: data };
		} else {
			return null;
		}

		const user = await Prisma.user.findFirst({
			where: query,
		});
		return user;
	}
}
export default Database;
