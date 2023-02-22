import { useEffect } from "react"

const useKeypress = (handler) => {
  useEffect(() => {
    const eventListener = ({ key, ctrlKey }) => {
      handler(key, ctrlKey)
    }
    window.addEventListener("keyup", eventListener)
    return () => {
      window.removeEventListener("keyup", eventListener)
    }
  }, [handler])
}

export default useKeypress
