import { CategoriesFilter } from "@/components/categories-filter"
import { PlaceProps, Places } from "@/components/places"
import { api } from "@/services/api"
import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import * as Location from "expo-location"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import MapView, { Callout, Marker } from "react-native-maps"

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

interface MarketProps extends PlaceProps {
  latitude: number
  longitude: number
}

export default function HomeScreen() {
  const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState<string | undefined>(
    undefined
  )
  const [markets, setMarkets] = useState<MarketProps[]>([])

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

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (granted) {
        const location = await Location.getCurrentPositionAsync()
        console.log(location)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
    // getCurrentLocation()
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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />
        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </View>
  )
}
