type BasePizza = {
  id: string
  title: string
  price: number
  imageUrl: string
}

export type PizzaItem = BasePizza & {
  types: number[]
  sizes: number[]
  rating: number
}

export type CartItemProps = BasePizza & {
  type: string
  size: number
  count: number
}
