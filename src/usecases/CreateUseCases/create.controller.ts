import type { FastifyReply, FastifyRequest } from "fastify";
import type CreateUseCase from "./create.usecase";
import type {
	IErrorClient,
	IUserRegister,
} from "../../interfaces/authentication.interface";

export class CreateController {
	constructor(private createUseCase: CreateUseCase) {}
	async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
		try {
			// Executa o usecase tentando criar usuario
			const createUser = await this.createUseCase.execute(
				req.body as IUserRegister,
			);
			// caso de algum erro da api
			if ((createUser as IErrorClient).status === "fail") {
				return res.code((createUser as IErrorClient).code).send(createUser);
			}
			return res.code(201).send();
		} catch (err) {
			// caso de algum erro no servidor
			console.error(err);
			return res.code(500).send("Erro interno no servidor.");
		}
	}
}
