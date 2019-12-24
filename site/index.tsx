import * as React from "react"
import { render } from "react-dom"
import "babel-polyfill"

// import { Api } from "./api";
import { useFetch } from "./utils/index"

import GuestList from "./GuestList"

const App = () => {
  const { fetching, error, data = [] } = useFetch("/api/guest/get/all")
  console.log(data)

  return (
    <div>
      <h1>Hello World!</h1>
      <GuestList guestList={data} />
    </div>
  )
}

render(<App />, document.getElementById("root"))
