import { createTransport } from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { config as dotEnvConfig } from "dotenv"

dotEnvConfig()
const {
  SMTP_HOST: host,
  SMTP_AUTH_PASSWORD: pass,
  SMTP_MAIL: user,
} = process.env

const mailerConfiguration: SMTPTransport.Options = {
  service: "gmail",
  host,
  auth: {
    user,
    pass,
  },
}
const transporter = createTransport(mailerConfiguration)
export function send(
  mail: Mail.Options
): Promise<SMTPTransport.SentMessageInfo> {
  return transporter.sendMail(mail)
}
