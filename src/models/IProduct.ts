export default interface IProduct {
  id: string,
  name: string,
  description: string,
  measurement_units: number | null,
  deposit:string,
  code:number | null,
  min_quantity:number | null,
  price:number | null,
  rent_price:number | null,
  accounting_price:number | null,
  type:number | null,
  custom_values: any []


}