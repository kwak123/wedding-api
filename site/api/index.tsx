import axios from "axios"

export interface Guest {
  name: string
  plusOneId: string
  email: string
  confirmed: boolean
}

export class Api {
  getAllGuests() {
    return axios.get("/guest/get/all")
  }
}
