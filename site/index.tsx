import * as React from "react"
import { Component } from "react"
import { render } from "react-dom"
import "babel-polyfill"

// import { Api } from "./api";
import { useFetch } from "./utils/index"

const App = () => {
  const { fetching, error, data } = useFetch("/api/guest/get/all")
  console.log(data)

  return <h1>Hello World!</h1>
}

render(<App />, document.getElementById("root"))
