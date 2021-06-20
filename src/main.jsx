import { useEffect, useState } from 'react'
import { useProductsAPI } from './hooks'
import { MainList } from './main-list'

export function Main() {
  const { getAllProducts } = useProductsAPI()
  const [list, setList] = useState(null)
  var products = [{
    name: "nome",
    description: "descricao",
    value: 68
  },{
    name: "nome",
    description: "descricao",
    value: 68
  },
  {
    name: "nome",
    description: "descricao",
    value: 68
  }]

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
      <MainList list={products} updateList={updateList} />
    </main>
  )
}

export default Main