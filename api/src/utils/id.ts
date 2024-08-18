import generateID from "@/libs/nanoid"

export const createId = (key: string, chars?: number) =>
  key + "_" + generateID(chars)
