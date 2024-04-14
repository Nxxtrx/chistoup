import React, { FC } from 'react'
import editProductBtnIcon from '../../utils/images/edit-btn.svg'
import IProduct from '../../models/IProduct'
import Pagination from '../pagination/Pagintaion'
import DropdownMenu from '../dropdownMenu/DropdownMenu'
import './ProductList.scss'

interface ProductListProps {
  productList: IProduct[]
  itemsPerPage: string,
  currentPage: number,
  sort: string,
  setItemsPerPage: (itemsPerPage:string) => void;
  onPageChange: (pageNumber: number) => void, 
  handlePopupOpened: (title:string, data: IProduct) => void,
  toggleSortOrder: () => void,
}

const ProductList: FC<ProductListProps> = ({productList, itemsPerPage, setItemsPerPage, onPageChange, currentPage, handlePopupOpened, toggleSortOrder, sort}) => {

  return (
    <section className='products'>
      <table className='products__table'>
        <thead>
          <tr>
            <th>Название<button onClick={toggleSortOrder} className={`product__sort ${sort === 'ASC' && 'product__sort_type_ask'} ${sort === 'DESC' && 'product__sort_type_desc'}`}></button></th>
            <th>Единица измерения</th>
            <th>Артикул/код</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.measurement_units ? `${product.measurement_units}` : '-'}</td>
              <td>{product.code ? `#${product.code}` : '-'}</td>
              <td className='products__row_type_btn'>
                <button onClick={() => handlePopupOpened(product.name, product)} className='products__change-btn'>
                  <img src={editProductBtnIcon} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='products__setting-container'>
        <Pagination totalItems={21} itemsPerPage={itemsPerPage}  onPageChange={onPageChange} currentPage={currentPage}/>
        <DropdownMenu itemsPerPage={itemsPerPage} setItemPerPage={setItemsPerPage}/>
      </div>
    </section>
  )
}

export default ProductList