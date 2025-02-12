import fastify from "fastify";
const app = fastify({ logger: true });

class Server {
	public async start(port: number, host: string): Promise<void> {
		try {
			await app.listen({ port, host });
			console.log("Server running on port", port);
		} catch (err) {
			console.error(err);
			process.exit(1);
		}
	}
}

export default Server;
