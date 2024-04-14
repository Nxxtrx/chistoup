import { useEffect, useState } from 'react';
import './App.scss';
import Header from '../header/Header';
import ProductList from '../producrList/ProductList';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchAuth, fetchChangeProduct, fetchNewProduct, fetchProduct } from '../../store/redusers/ActionCreators';
import MainContainer from '../../containers/mainContainer/MainContainer';
import Popup from '../popup/Popup';
import IProduct from '../../models/IProduct';
import INewProduct from '../../models/INewProduct';

enum SortOrder {
  None = '',
  Ascending = 'ASC',
  Descending = 'DESC'
}

function App() {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemPerPage] = useState<string>("10")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'))
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [popupTitle, setPopupTitle] = useState<string>('')
  const [popupDataChange, setPopupDataChange] = useState<IProduct | null>(null)
  const [sortState, setSortState] = useState<SortOrder>(SortOrder.None)

  const dispatch = useAppDispatch()
  const productList = useAppSelector(state => state.productReducer.product)

  useEffect(() => {
    dispatch(fetchAuth())
      .then(result => {
        sessionStorage.setItem('token', result.payload.access_token);
        dispatch(fetchProduct({ 
          page: currentPage, 
          itemsPerPage: itemsPerPage, 
          searchQuery: searchQuery,  
          token: result.payload.access_token,
          sortBy: 'name',
          sortOrder: sortState
        }));
      })
  }, [dispatch]);

  useEffect(() => {
    if(token) {
      dispatch(fetchProduct({
        page: currentPage,
        itemsPerPage: itemsPerPage, 
        searchQuery:searchQuery, 
        token: token,
        sortBy: 'name',
        sortOrder: sortState
      }))
    }
  }, [currentPage, itemsPerPage, searchQuery, sortState])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handlePopupOpened = (title?:string, data?: IProduct | null) => {
    setIsOpen(prev => !prev)
    if (title) setPopupTitle(title)
    if (data) setPopupDataChange(data)
  }

  const handleClosePopup = () => {
    setIsOpen(false)
    setPopupDataChange(null)
  }

  const createNewProduct = (data: INewProduct) => {
    if (token) dispatch(fetchNewProduct({data: data, token: token}))
  }

  const changeProduct = (data: INewProduct, id: string) => {
    if(token) dispatch(fetchChangeProduct({data: data, token: token, id: id}))
  }

  const toggleSortOrder = () => {
    switch (sortState) {
      case SortOrder.None:
        setSortState(SortOrder.Ascending);
        break;
      case SortOrder.Ascending:
        setSortState(SortOrder.Descending);
        break;
      case SortOrder.Descending:
        setSortState(SortOrder.None);
        break;
      default:
        setSortState(SortOrder.None);
    }
  };

  return (
    <div className="page">
      <Header title={"Номенклатура"} setSearchQuery={setSearchQuery} handlePopupOpened={handlePopupOpened}/>
      <MainContainer>
        <ProductList 
          productList={productList} 
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemPerPage}
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          handlePopupOpened={handlePopupOpened}
          toggleSortOrder={toggleSortOrder}
          sort={sortState}
        />
      </MainContainer>
      <Popup 
        isOpen={isOpen} 
        handlePopupOpened={handlePopupOpened} 
        title={popupTitle} 
        data={popupDataChange} 
        handleClosePopup={handleClosePopup} 
        createNewProduct={createNewProduct}
        changeProduct={changeProduct}
      />
    </div>
  );
}

export default App;
