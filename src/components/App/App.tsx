import { useEffect, useState } from 'react';
import './App.scss';
import Header from '../header/Header';
import ProductList from '../producrList/ProductList';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hooks';
import { fetchAuth, fetchProduct } from '../../store/redusers/ActionCreators';
import Pagination from '../pagination/Pagintaion';
import ItemShow from '../dropdownMenu/DropdownMenu';
import MainContainer from '../../containers/mainContainer/MainContainer';

function App() {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemPerPage] = useState<string>("10")
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'))

  const dispatch = useAppDispatch()
  const productList = useAppSelector(state => state.productReducer.product)

  useEffect(() => {
    dispatch(fetchAuth())
      .then(result => {
        sessionStorage.setItem('token', result.payload.access_token);
        dispatch(fetchProduct({ page: currentPage, itemsPerPage: itemsPerPage,  token: result.payload.access_token }));
      })
  }, [dispatch]);

  useEffect(() => {
    if(token) {
      dispatch(fetchProduct({page: currentPage,  itemsPerPage: itemsPerPage, token: token}))
    }
  }, [currentPage, itemsPerPage])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="page">
      <Header title={"Номенклатура"}/>
      <MainContainer>
        <ProductList 
          productList={productList} 
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemPerPage}
          onPageChange={handlePageChange} 
          currentPage={currentPage}
        />
      </MainContainer>
    </div>
  );
}

export default App;
