import axios, { AxiosInstance } from "axios"
import FormData from "form-data"

const TEST_EMAIL_DOMAIN = "sandbox3d0a4781b7c641629e19910e918f9149.mailgun.org"
const BASE_URL = "https://api.mailgun.net"
const VERSION = "v3"

const API_URL = [BASE_URL, VERSION, TEST_EMAIL_DOMAIN].join("/")

export interface EmailOptions {
  // Who to send it to
  to: string
  // Email subject
  subject: string
  // Email body
  body: string
}

const MailgunConstants = {
  TO: "to",
  FROM: "from",
  SUBJECT: "subject",
  TEXT: "text",
}

class Mailgun {
  private from = "Samlysia <samlysia@kwakanalia.com>"
  private apiKey: string
  apiClient: AxiosInstance

  constructor(apiKey: string) {
    this.apiKey = apiKey

    this.apiClient = axios.create({
      auth: {
        username: "api",
        password: this.apiKey,
      },
    })
  }

  // Test
  sendEmail(emailOptions: EmailOptions) {
    const mailGunSendEmailEndpoint = `${API_URL}/messages`
    const formData = new FormData()
    formData.append(MailgunConstants.TO, emailOptions.to)
    formData.append(MailgunConstants.FROM, this.from)
    formData.append(MailgunConstants.SUBJECT, emailOptions.subject)
    formData.append(MailgunConstants.TEXT, emailOptions.body)

    return this.apiClient.post(mailGunSendEmailEndpoint, formData, {
      headers: formData.getHeaders(),
    })
  }
}

export { Mailgun }
