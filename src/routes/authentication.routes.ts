import type { FastifyInstance } from "fastify";
import controller from "../usecases/CreateUseCases";

const authenticationRoutes = async (app: FastifyInstance) => {
	app.post("/register", async (request, reply) => {
		return controller.handle(request, reply);
	});
};

export default authenticationRoutes;
