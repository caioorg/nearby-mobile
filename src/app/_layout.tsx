import { colors } from "@/styles/colors"
import { Stack } from "expo-router"

import { Loading } from "@/components/loading"
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  useFonts,
} from "@expo-google-fonts/rubik"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function LayoutRoot() {
  const [fontsLoaded] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  })

  if (!fontsLoaded) return <Loading />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.gray[100],
          },
        }}
      />
    </GestureHandlerRootView>
  )
}
