import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import popupIcon from '../../utils/images/home-03.svg'
import closeIcon from '../../utils/images/close-icon.svg'
import './Popup.scss'
import IProduct from '../../models/IProduct'
import INewProduct from '../../models/INewProduct'
import { useAppDispatch} from '../../hooks/store'
import { addNewProduct, editProduct } from '../../store/redusers/ProductSlice'

interface PopupProps {
  isOpen: boolean,
  title: string,
  data?: IProduct | null,
  handlePopupOpened: (title?: string) => void,
  handleClosePopup: () => void
  createNewProduct: (data: INewProduct) => void,
  changeProduct: (data: INewProduct, id: string) => void
}

const Popup: FC<PopupProps> = ({isOpen, handlePopupOpened, title, data, handleClosePopup, createNewProduct, changeProduct}) => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState<INewProduct>({
    name: data ? data.name : '', 
    measurement_units: data ? data.measurement_units : '', 
    description: data ? data.description : '',
    code: data ? data.code : '', 
  })

  useEffect(() => {
    if (data) {
      setValue({
        name: data.name, 
        measurement_units: data.measurement_units, 
        description: data.description,
        code: data.code, 
      })
    } else {
      setValue({
        name: '', 
        measurement_units: '', 
        description: '',
        code: '', 
      })
    }
  }, [data])
  

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValue(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }
  

  const handleSubmit = (event: FormEvent<HTMLFormElement>, id?:string) => {
    event.preventDefault()
    if (title === 'Новая позиция') {
      createNewProduct(value)
      handleClosePopup()
      dispatch(addNewProduct(value))
    } else if (data) { 
      changeProduct(value, data.id)
      handleClosePopup()
      dispatch(editProduct({...value, id: data.id}))
    }
  }

  return (
    <section className={`popup ${isOpen && "opened"}`}>
      <div className='popup__overlay'></div>
      <div className='popup__container'>
        <div className='popup__header-container'>
          <img className="popup__icon" src={popupIcon} alt="" />
          <button onClick={() => handleClosePopup()} className='popup__close-btn'>
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <h2 className='popup__title'>{title}</h2>
        <p className='popup__description'>Заполните все поля для создания новой номенклатуры</p>
        <form className='popup__form' onSubmit={handleSubmit}>
          <label className='popup__label'>Название<br/>
            <input name='name' value={'' || value.name} className='popup__input' type="text" onChange={handleChange} required/>
          </label>
          <label className='popup__label'>Единицы измерения<br/>
            <input  name='measurement_units' value={ '' || value.measurement_units} className='popup__input' type="text" onChange={handleChange} required/>
          </label>
          <label className='popup__label'>Артикул/код<br/>
            <input  name='code' value={'' || value.code} className='popup__input' type="number" onChange={handleChange}/>
          </label>
          <label className='popup__label'>Описание<br/>
            <textarea  name='description' value={'' || value.description} className='popup__input' onChange={handleChange}/>
          </label>
          <div className='popup__btn-container'>
            <button className='popup__btn popup__btn_type_cancel'>Отмена</button>
            <button type='submit' className='popup__btn popup__btn_type_submit' >Подтвердить</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Popup