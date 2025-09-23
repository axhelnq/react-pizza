import React from 'react'
import cartEmptyImg from '../assets/img/cartEmpty.svg'
import { Link } from 'react-router-dom'

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Кошик пустий <icon>😕</icon>
      </h2>
      <p>
        Скоріш за все, ви не замовляли ще піцу.
        <br />
        Для того, щоб замовити піцу, перейдіть на головну сторінку.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутися назад</span>
      </Link>
    </div>
  )
}

export default CartEmpty
