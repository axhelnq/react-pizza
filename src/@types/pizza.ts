type BasePizza = {
  id: string
  title: string
  price: number
  imageUrl: string
}

export type IPizzaProps = BasePizza & {
  types: number[]
  sizes: number[]
  rating: number
}

export type ICartItemProps = BasePizza & {
  type: string
  size: number
  count: number
}
