import { useEffect, useReducer } from "react"
import axios from "axios"

interface FetchState {
  fetching: boolean
  error: boolean
  data: any
}

interface Action {
  type: string
  payload?: any
}

const initialState = {
  fetching: false,
  error: false,
  data: [],
}

const reducer = (state: FetchState, action: Action) => {
  switch (action.type) {
    case "startFetch":
      return { ...state, fetching: true, error: false }
    case "errorFetched":
      return { ...state, fetching: false, error: true }
    case "dataFetched":
      return { ...state, data: action.payload }
  }
}

const useFetch = (url: string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchData = async function() {
      try {
        dispatch({ type: "startFetch" })
        const response = await axios.get(url)
        dispatch({ type: "dataFetched", payload: response.data })
      } catch (error) {
        dispatch({ type: "errorFetched" })
      }
    }
    fetchData()
  }, [url, dispatch])

  return state
}

export default useFetch
