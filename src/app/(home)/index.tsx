import { CategoriesFilter } from "@/components/categories-filter"
import { Places } from "@/components/places"
import { api } from "@/services/api"
import { useEffect, useState } from "react"
import { View } from "react-native"

export default function HomeScreen() {
  const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState<string | undefined>(
    undefined
  )
  const [markets, setMarkets] = useState([])

  async function fetchCategory() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategorySelected(data[0].id as string)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchMarkets() {
    try {
      if (!categorySelected) return

      const { data } = await api.get(`/markets/category/${categorySelected}`)
      setMarkets(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [categorySelected])

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <CategoriesFilter
        categories={categories}
        selected={categorySelected}
        onSelected={(categoryId: string) => setCategorySelected(categoryId)}
      />
      <Places data={markets} />
    </View>
  )
}
