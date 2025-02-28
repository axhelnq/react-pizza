import { useState } from 'react'

function Categories() {
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті']

	return (
		<div className='categories'>
			<ul>
				{categories.map((val, i) => (
					<li
						key={i}
						className={activeIndex === i ? 'active' : null}
						onClick={() => setActiveIndex(i)}>
						{val}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
