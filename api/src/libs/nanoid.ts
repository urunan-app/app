import { customAlphabet } from "nanoid"

const generateID = (chars?: number) => {
  return customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    chars || 7 // 7-character random string by default
  )()
}

export default generateID
