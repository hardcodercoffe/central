import type { Mail } from "../../utils/mail";
import type IDatabase from "../../database/authentication.database";
import type {
	IErrorClient,
	IUserRegister,
	IUserResponse,
} from "../../interfaces/authentication.interface";
import type { IEncrypt } from "../../utils/encrypt";

export default class CreateUseCase {
	constructor(
		private database: IDatabase,
		private encrypt: IEncrypt,
		private mail: Mail,
	) {}

	async execute(data: IUserRegister): Promise<IUserResponse | IErrorClient> {
		// criptografa e salva a senha
		const { password } = data;
		data.password = await this.encrypt.encrypt(password);

		// verifica se ja existe esse email
		const verifyEmail = await this.database.findUser(data.email, "email");
		if (verifyEmail) {
			return { code: 409, status: "fail", message: "Email já cadastrado" };
		}

		// verifica se ja existe esse username
		const verifyUsername = await this.database.findUser(
			data.username,
			"username",
		);
		if (verifyUsername) {
			return {
				code: 409,
				status: "fail",
				message: "Usuario já cadastrado",
			};
		}

		const sendConfirmationMail = this.mail.send({
			from: {
				name: "Central",
				email: process.env.MAIL_USER,
			},
			to: {
				name: data.username,
				email: data.email,
			},
			subject: "Bem-vindo ao Central",
			html: `Seja bem-vindo ao Central, ${data.username}! <br> Para confirmar a sua conta, clique no link abaixo: <br> <a href="http://localhost:3000/verify/${data.username}">Clique aqui</a>`,
		});
		if (!sendConfirmationMail) {
			return { code: 500, status: "fail", message: "Erro ao enviar email" };
		}

		return await this.database.create(data);
	}
}
