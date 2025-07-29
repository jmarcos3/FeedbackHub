export interface Room {
  id: string
  title: string
  description?: string
  ownerId: string
  createdAt: string
  updatedAt?: string
}

export interface RoomInfo {
  title: string
  description: string
}

export type RatingValue = 1 | 2 | 3 | 4 | 5

export const ratingLabels: Record<RatingValue, string> = {
  1: "Péssimo - Não gostei nada",
  2: "Ruim - Poderia ser melhor",
  3: "Regular - Nem bom, nem ruim",
  4: "Bom - Gostei bastante",
  5: "Excelente - Adorei!"
}
export interface Feedback {
  id: string
  content: string
  rating: RatingValue
  createdAt: string
  userId?: string
}
