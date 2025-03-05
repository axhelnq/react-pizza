import { useEffect, useState } from 'react'
import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'
import PizzaBlock from '../components/PizzaBlock/index.jsx'

function Home() {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch('https://67c315de1851890165ae218e.mockapi.io/items')
				const data = await res.json()

				setItems(data)
				setIsLoading(false)
			} catch (error) {
				console.error(error)
			}
		}
		fetchData()
	}, [])
	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Всі піци</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} index={index} />)
					: items.map((item) => <PizzaBlock key={item.id} {...item} />)}
			</div>
		</>
	)
}

export default Home
