import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import { FontAwesome5 } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

const s = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
  step: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[600],
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginTop: 14,
  },
})

interface StepWelcomeProps {
  instructions: {
    title: string
    description: string
    icon: string
  }[]
}

export function StepWelcome(args: StepWelcomeProps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>Veja como funciona:</Text>
      {args.instructions.map(({ description, title, icon }, idx) => (
        <View style={s.step} key={idx}>
          {icon && (
            <FontAwesome5 name={icon} size={28} color={colors.red.base} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={s.stepTitle}>{title}</Text>
            <Text style={s.stepDescription}>{description}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}
