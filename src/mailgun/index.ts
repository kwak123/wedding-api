import axios, { AxiosInstance } from "axios"
import FormData from "form-data"

const TEST_EMAIL_DOMAIN = "mg.kwakanalia.wedding"
const BASE_URL = "https://api.mailgun.net"
const VERSION = "v3"

const API_URL = [BASE_URL, VERSION, TEST_EMAIL_DOMAIN].join("/")

export interface EmailOptions {
  // Who to send it to
  to: string
  // Email subject
  subject: string
  // only permitted templates
  template: string
  // Mailgun Vars in JSON form
  mailgunVars?: string
}

const MailgunConstants = {
  TO: "to",
  FROM: "from",
  SUBJECT: "subject",
  TEXT: "text",
  HTML: "html",
  TEMPLATE: "template",
  MAILGUN_VARS: "X-Mailgun-Variables",
}

class Mailgun {
  private from = "Samlysia <samlysia@mg.kwakanalia.wedding>"
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

  sendEmailStub() {
    return Promise.resolve()
  }

  // Test
  sendEmail(emailOptions: EmailOptions) {
    const mailGunSendEmailEndpoint = `${API_URL}/messages`
    const formData = new FormData()
    formData.append(MailgunConstants.TO, emailOptions.to)
    formData.append(MailgunConstants.FROM, this.from)
    formData.append(MailgunConstants.SUBJECT, emailOptions.subject)
    // formData.append(MailgunConstants.TEXT, emailOptions.body)
    // formData.append(MailgunConstants.HTML, this.formatEmail(emailOptions.body))
    formData.append(MailgunConstants.TEMPLATE, emailOptions.template)

    const headers = {
      ...formData.getHeaders(),
    }

    if (emailOptions.mailgunVars) {
      headers[MailgunConstants.MAILGUN_VARS] = emailOptions.mailgunVars
    }

    return this.apiClient.post(mailGunSendEmailEndpoint, formData, {
      headers,
    })
  }

  formatEmail(email: string) {
    return `
      <div>
        <p>Testing sending an email HTML body</p>
        <p>Actual text: ${email}</p>
      </div>
    `
  }
}

export { Mailgun }
