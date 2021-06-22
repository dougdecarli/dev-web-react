import { useRequest } from './use-request.hook'

export function useProductsAPI() {
  const { get } = useRequest('products')

  const getAllProducts = async () => {
    return await get('')
  }

  return {
    getAllProducts
  }
}