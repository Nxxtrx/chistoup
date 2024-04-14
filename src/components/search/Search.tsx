import React, { ChangeEvent, FC, useState } from 'react'
import searchIcon from '../../utils/images/search-out-divider.svg'
import './Search.scss'

interface SearchProps {
  setSearchQuery: (query: string) => void
}

const Search: FC<SearchProps> = ({setSearchQuery}) => {

  const [value, setValue] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if(event.target.value === '') {
      setSearchQuery('')
    }
  }

  return (
    <div className='search'>
      <label className='search__label'>
        <img className='search__logo' src={searchIcon} alt="" />
        <input className='search__input' value={value} onChange={handleChange} type="text" placeholder='Поиск по названию' /> 
      </label>
      <button className='search__btn-submit' onClick={() => setSearchQuery(value.toLowerCase())}>Поиск</button>
    </div>
  )
}

export default Search