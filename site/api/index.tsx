import axios from "axios"

export class Api {
  getAllGuests() {
    return axios.get("/api/guest/get/all")
  }
}

const instance = new Api()

export default instance
