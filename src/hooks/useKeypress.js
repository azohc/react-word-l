import { useEffect } from "react"

const useKeypress = (handler) => {
  useEffect(() => {
    const eventListener = ({ key, ctrlKey }) => {
      handler(key, ctrlKey)
    }
    window.addEventListener("keydown", eventListener)
    return () => {
      window.removeEventListener("keydown", eventListener)
    }
  }, [handler])
}

export default useKeypress
