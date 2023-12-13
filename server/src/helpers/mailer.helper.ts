import nodemailer from 'nodemailer';
import { MailInterface } from '../Interfaces/mail.interface';

export const sendMailer = ({ mailText, subject, userMail }: MailInterface) => {
	const mailOptions = {
		from: process.env.ADMIN_MAIL,
		to: userMail,
		subject: subject,
		text: mailText,
	};

	const transporter = nodemailer.createTransport({
		service: process.env.ADMIN_MAILING_PLATFORM,
		auth: {
			user: process.env.ADMIN_MAIL, // Your Gmail email address
			pass: process.env.ADMIN_APP_SPECIFIC_PASSWORD, // Your Gmail password or app-specific password
		},
	});

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			// Handle email sending error
			console.error('Error sending email:', error);
		} else {
			// Email sent successfully
			console.log('Email sent:', info.response);
		}
	});
};
