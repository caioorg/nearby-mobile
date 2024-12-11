import { Button } from "@/components/button"
import { Loading } from "@/components/loading"
import { Market } from "@/components/market"
import { api } from "@/services/api"
import { CameraView, useCameraPermissions } from "expo-camera"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Alert, Modal, StatusBar, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

interface MarketDetail {
  name: string
  cover: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

export default function MarketDetailPage() {
  const [data, setData] = useState<MarketDetail | null>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const params = useLocalSearchParams<{ id: string }>()
  const [isVisibleCameralModal, setIsVisibleCameraModal] =
    useState<boolean>(false)
  const [couponIsFetching, setCouponIsFetching] = useState(false)
  const [_, requestPermission] = useCameraPermissions()
  const qrLock = useRef(false)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  async function fnHandleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted)
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera.")

      qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Câmera", "Não foi possível utilizar a câmera")
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)
      const { data } = await api.patch(`/coupons/${id}`)
      Alert.alert("Cupom", data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
    }
  }

  async function fnHandleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    )
  }

  if (loading || data == null) return <Loading />

  return (
    <Market>
      <StatusBar barStyle="light-content" hidden={isVisibleCameralModal} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Market.Cover uri={data.cover} />
        <Market.Details data={data} />
        {coupon && <Market.Coupon code={coupon} />}
      </ScrollView>
      <View style={{ padding: 32 }}>
        <Button onPress={fnHandleOpenCamera}>
          <Button.Title>Ler QR CODE</Button.Title>
        </Button>
      </View>
      <Modal style={{ flex: 1 }} visible={isVisibleCameralModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => fnHandleUseCoupon(data), 500)
            }
          }}
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </Market>
  )
}
