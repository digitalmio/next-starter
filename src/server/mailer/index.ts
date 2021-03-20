import { createTransport } from 'nodemailer';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

interface ISendMail {
  from: string
  to: string
  subject: string
  html: string
  text?: string
}

export default function sendEmail({ from, to, subject, html, text }: ISendMail): any {
  const transporter = createTransport(config.smtp);
  return transporter.sendMail({ from, to, subject, html, text})
}