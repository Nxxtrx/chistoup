import React, { FC } from 'react'
import plusButtonImg from '../../utils/images/plus-02.svg'
import Counter from '../counter/Counter'
import Search from '../search/Search'
import './Header.scss'
import IProduct from '../../models/IProduct'

interface headerProps {
  title: string,
  setSearchQuery: (query: string) => void,
  handlePopupOpened: (title:string, data: null) => void
}

const Header: FC<headerProps> = ({title, setSearchQuery, handlePopupOpened}) => {

  return (
    <header className='header'>
      <div className='header__title-container'>
        <h2 className='header__title'>{title}</h2>
        <Counter />
      </div>
      <Search setSearchQuery={setSearchQuery}/>
      <button onClick={() => handlePopupOpened('Новая позиция', null)} className='header__btn-add'><img src={plusButtonImg} alt="" /> Новая позиция</button>
    </header>
  )
}

export default Header