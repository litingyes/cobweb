import type { JsonValue } from 'type-fest'

export function createResponseJSON(data: JsonValue | null, error?: {
  code: number
  message: string
}) {
  return Response.json({
    data,
    error,
  })
}
