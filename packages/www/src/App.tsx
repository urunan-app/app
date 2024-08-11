import React, { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { api } from "./api"

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")

  const getData = async () => {
    try {
      const { data } = await api.index.get()
      if (data) {
        setMessage(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <p>{message}</p>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
