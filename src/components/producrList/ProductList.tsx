import React, { FC } from 'react'
import editProductBtnIcon from '../../utils/images/edit-btn.svg'
import IProduct from '../../models/IProduct'
import Pagination from '../pagination/Pagintaion'
import DropdownMenu from '../dropdownMenu/DropdownMenu'
import './ProductList.scss'

interface ProductListProps {
  productList: IProduct[]
  itemsPerPage: string,
  setItemsPerPage: (itemsPerPage:string) => void;
  onPageChange: (pageNumber: number) => void, 
  currentPage: number,
}

const ProductList: FC<ProductListProps> = ({productList, itemsPerPage, setItemsPerPage, onPageChange, currentPage}) => {

  return (
    <section className='products'>
      <table className='products__table'>
        <thead>
          <tr>
            <th>Название</th>
            <th>Единица измерения</th>
            <th>Артикул/код</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.map(product => (
            <tr>
            <td>{product.name}</td>
            <td>шт</td>
            <td>{product.code ? `#${product.code}` : '-'}</td>
            <td className='products__row_type_btn'>
              <button className='products__change-btn'>
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