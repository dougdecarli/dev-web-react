import { useRequest } from './use-request.hook'

export function useOrderAPI() {
  const { post } = useRequest('orders')

  async function postOrder(
    clientName,
    total,
    cellphone,
    address
  ) {
    return (
      (await post('', {clientName, total, cellphone, address})) !== undefined
    )
  }

  return {
    postOrder
  }
}