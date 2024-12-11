import { Button } from "@/components/button"
import { StepWelcome } from "@/components/steps-welcome"
import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import { INSTRUCTIONS_WELCOME } from "@/utils/constants"
import { Image, StyleSheet, Text, View } from "react-native"

const s = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 24,
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
})

export default function App() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Image source={require("@/assets/logo.png")} style={s.logo} />
      <Text style={s.title}>Boas vindas ao Nearby!</Text>
      <Text style={s.subtitle}>
        Tenha cupons de vantagem para usar em seus estabelecimentos favoritos!
      </Text>
      <StepWelcome instructions={INSTRUCTIONS_WELCOME} />
      <Button>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  )
}
