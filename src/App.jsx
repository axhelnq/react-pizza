import './scss/app.scss'
import Header from './components/Header.jsx'
import Categories from './components/Categories.jsx'
import Sort from './components/Sort.jsx'
import PizzaBlock from './components/PizzaBlock.jsx'
import items from './assets/pizzas.json'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Всі піци</h2>
					<div className='content__items'>
						{items.map((item) => (
							<PizzaBlock
								key={item.id}
								{...item}
								// title={item.title}
								// price={item.price}
								// imageUrl={item.imageUrl}
								// types={item.types}
								// sizes={item.sizes}
								// category={item.category}
								// rating={item.rating}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
