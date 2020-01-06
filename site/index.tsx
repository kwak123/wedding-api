import * as React from "react"
import { render } from "react-dom"
import "babel-polyfill"

// import { Api } from "./api";
import { useFetch } from "./utils/index"

import GuestList from "./components/guestList"

const App = () => {
  return (
    <div>
      <h1>Guests</h1>
      <GuestList />
    </div>
  )
}

render(<App />, document.getElementById("root"))
