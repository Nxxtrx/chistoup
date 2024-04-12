
export const getProduct = (page:number, itemsPerPage:string, token:string) => {
  return fetch(`https://hcateringback-dev.unitbeandev.com/api/items?warehouseId=6aac3263-ca1f-4b4e-8973-3a948873d9de&page=${page}&pageSize=${itemsPerPage}`, {
    method: 'GET',
    headers: {
      "Authorization": token,
    }
  }).then(res => res.json())
}

export const auth = () => {
  return fetch('https://hcateringback-dev.unitbeandev.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({login: "admin", password: "admin"})
  }).then(res => res.json())
  .then(data => data)
}