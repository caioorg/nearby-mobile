import { colors } from "@/styles/colors"
import { ActivityIndicator, StyleSheet } from "react-native"

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray[200],
  },
})

export function Loading() {
  return <ActivityIndicator color={colors.green.base} style={s.container} />
}
