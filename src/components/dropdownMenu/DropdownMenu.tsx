import React, { ChangeEvent, FC, useState } from 'react'
import './DropdownMenu.scss'

interface DropdownMenuProps {
  itemsPerPage: string,
  setItemPerPage: (itemPerPage:string) => void,
}

const DropdownMenu: FC<DropdownMenuProps> = ({itemsPerPage, setItemPerPage}) => {
  
  const options: string[] = ['5', '10', '20', '50'];

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemPerPage(event.target.value);
  };

  return (
    <section className='dropdown'>
      <form className='dropdown__form'>
        <label className='dropdown__label' htmlFor='drop-down'>Показывать по:</label>
        <select id='drop-down' className='dropdown__select' value={itemsPerPage} onChange={handleInputChange}>
        {options.map((item, index) => (
          <option key={index} className='dropdown__element'>{item}</option>
        ))}
        </select>
      </form>
    </section>
  )
}

export default DropdownMenu