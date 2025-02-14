import nodemailer from "nodemailer";

export interface IAddressMail {
	name: string | undefined;
	email: string | undefined;
}

export interface IMail {
	from: IAddressMail;
	to: IAddressMail;
	subject: string;
	html: string;
}
export const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT),
	secure: Boolean(process.env.MAIL_SECURE),
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

export class Mail {
	constructor(private mailer: typeof transporter) {}
	async send(data: IMail) {
		try {
			const sendMail = await this.mailer.sendMail({
				from: `"${data.from.name}" <${data.from.email}>`,
				to: `"${data.to.name}" <${data.to.email}>`,
				subject: data.subject,
				html: data.html,
			});
			if (sendMail) {
				return true;
			}
		} catch (err) {
			console.error(err);
			return false;
		}
	}
}
