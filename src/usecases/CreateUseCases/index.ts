import CreateUseCase from "./create.usecase";
import Database from "../../database/authentication.database";
import { Encrypt } from "../../utils/encrypt";
import { CreateController } from "./create.controller";
import { Mail, transporter } from "../../utils/mail";
const createUseCase = new CreateUseCase(
	new Database(),
	new Encrypt(),
	new Mail(transporter),
);
const controller = new CreateController(createUseCase);
export default controller;
