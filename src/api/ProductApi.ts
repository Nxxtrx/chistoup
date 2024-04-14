import INewProduct from "../models/INewProduct"

export const getProduct = (page:number, itemsPerPage:string, searchQuery: string, token:string, sortBy: string, sortOrder: string) => {
  return fetch(`https://hcateringback-dev.unitbeandev.com/api/items?page=${page}&pageSize=${itemsPerPage}&itemName=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
    method: 'GET',
    headers: {
      "Authorization": token,
    }
  }).then(res => res.json())
  .catch(err => console.log(err))
}

export const auth = () => {
  return fetch('https://hcateringback-dev.unitbeandev.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({login: "admin", password: "admin"})
  }).then(res => res.json())
  .then(data => data)
  .catch(err => console.log(err))
}

export const setNewProduct = (product: INewProduct, token:string) => {
  return fetch('https://hcateringback-dev.unitbeandev.com/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": token,
    }, body: JSON.stringify({name: product.name, measurement_units: product.measurement_units, description: product.description, code: product.code })
  }).then(res => res.json())
  .catch(err => console.log(err))
}

export const changeProduct = (product: INewProduct, token:string, id:string) => {
  return fetch(`https://hcateringback-dev.unitbeandev.com/api/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": token,
    }, body: JSON.stringify({name: product.name, measurement_units: product.measurement_units, description: product.description, code: product.code })
  }).then(res => res.json())
  .catch(err => console.log(err))
}