/* eslint-disable no-undef */
import nodemailer, { SentMessageInfo, TransportOptions } from 'nodemailer';
import 'dotenv/config';
import { IEmailData } from '../types/interfaces';

// eslint-disable-next-line no-undef
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // remove it from the prod

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
} as TransportOptions);

async function send({ email, subject, html }: IEmailData): Promise<void> {
	await transporter.sendMail({
		from: 'Auth API',
		to: email,
		subject,
		html,
	});
}

async function activationEmail(email: string, token: string): Promise<void> {
	const link = `http://${process.env.CLIENT_HOST}/${token}`;

	return send({
		email,
		subject: 'Activation email',
		html: `
			<h1>Activation email</h1>
			<a target="_blank" href=${link}>Follow the link</a>
		`,
	}).then(() => console.log('email were sended'));
}

export const emailService = {
	send,
	activationEmail,
};
