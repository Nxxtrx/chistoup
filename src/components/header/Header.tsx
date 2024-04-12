import React, { FC } from 'react'
import plusButtonImg from '../../utils/images/plus-02.svg'
import Counter from '../counter/Counter'
import Search from '../search/Search'
import './Header.scss'

interface headerProps {
  title: string
}

const Header: FC<headerProps> = ({title}) => {
  return (
    <header className='header'>
      <div className='header__title-container'>
        <h2 className='header__title'>{title}</h2>
        <Counter />
      </div>
      <Search />
      <button className='header__btn-add'><img src={plusButtonImg} alt="" /> Новая позиция</button>
    </header>
  )
}

export default Header