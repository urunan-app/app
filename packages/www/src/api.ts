import { treaty } from "@elysiajs/eden"
import { Api } from "api"

export const api = treaty<Api>(import.meta.env.VITE_API_URL)
