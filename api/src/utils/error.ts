export const flattenError = (e: any | Error) =>
  e instanceof Error ? e.message : JSON.stringify(e)
