import axios, { AxiosInstance } from "axios"
import FormData from "form-data"

const TEST_EMAIL_DOMAIN = "sandbox3d0a4781b7c641629e19910e918f9149.mailgun.org"
const BASE_URL = "https://api.mailgun.net"
const VERSION = "v3"

const API_URL = [BASE_URL, VERSION, TEST_EMAIL_DOMAIN].join("/")

class Mailgun {
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
  sendEmail() {
    const mailGunSendEmailEndpoint = `${API_URL}/messages`
    const formData = new FormData()
    formData.append("to", "elysia.hwang@gmail.com")
    formData.append("from", "The BB! <thebb@kwakanalia.com>")
    formData.append("subject", "Does it work?")
    formData.append("text", "If this reaches you, look at me in an annoyed way")

    return this.apiClient.post(mailGunSendEmailEndpoint, formData, {
      headers: formData.getHeaders(),
    })
  }
}

export { Mailgun }
