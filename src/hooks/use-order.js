import { useRequest } from './use-request.hook'

export function useOrderAPI() {
  const { post } = useRequest('orders')

  async function postOrder(
    clientName,
    total,
    cellphone,
    address,
    products
  ) {
    return (
      (await post('', {clientName, total, cellphone, address, products})) !== undefined
    )
  }

  return {
    postOrder
  }
}