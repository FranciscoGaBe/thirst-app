interface FailSaleDTO {
  success: false
  error: string
}

interface SuccessSaleDTO {
  success: true
  quantityLeft: number
  moneyLeft: number
}

export interface CreateSaleDTO {
  drinkType: string
  moneyAmount: number
}

export type CreateSaleResponseDTO = FailSaleDTO | SuccessSaleDTO
