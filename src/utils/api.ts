import type { JsonValue } from 'type-fest'

export function createResponseJSON(data: JsonValue | null, error?: {
  status: number
  statusMessage: string
}) {
  if (error) {
    return Response.json({ error }, error)
  }

  return Response.json({
    data,
  })
}
