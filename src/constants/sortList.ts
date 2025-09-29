export type SortItem = {
  name: string
  sortProperty: string
}

const sortList: SortItem[] = [
  { name: 'популярністю (DESC)', sortProperty: 'rating' },
  { name: 'популярністю (ASC)', sortProperty: '-rating' },
  { name: 'ціною (DESC)', sortProperty: 'price' },
  { name: 'ціною (ASC)', sortProperty: '-price' },
  { name: 'алфавітом (DESC)', sortProperty: 'title' },
  { name: 'алфавітом (ASC)', sortProperty: '-title' },
] as const

export default sortList
