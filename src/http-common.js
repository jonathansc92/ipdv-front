import axios from "axios";

export default {
  http: axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json",
    },
  })
}
