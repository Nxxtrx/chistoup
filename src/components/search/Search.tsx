import React, { FC } from 'react'
import searchIcon from '../../utils/images/search-out-divider.svg'
import './Search.scss'

const Search: FC = () => {
  return (
    <div className='search'>
      <label className='search__label'>
        <img className='search__logo' src={searchIcon} alt="" />
        <input className='search__input' type="text" placeholder='Поиск по названию' /> 
      </label>
      <button className='search__btn-submit'>Поиск</button>
    </div>
  )
}

export default Search