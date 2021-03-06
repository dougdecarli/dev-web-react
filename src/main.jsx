import { useEffect, useState } from 'react'
import { useProductsAPI } from './hooks'
import { MainList } from './pages/list/main-list'

export function Main() {
  const { getAllProducts } = useProductsAPI()
  const [list, setList] = useState(null)

  async function updateList() {
    const result = await getAllProducts()

    if (result) {
      setList(result)
    }
  }

  useEffect(() => {
    updateList()
  }, [])

  return (
    <main className="container">
      <MainList list={list ? list : []} />
    </main>
  )
}

export default Main