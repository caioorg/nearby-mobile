import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import { FontAwesome5 } from "@expo/vector-icons"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

const s = StyleSheet.create({
  container: {
    height: 56,
    maxHeight: 56,
    backgroundColor: colors.green.base,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    flexDirection: "row",
  },
  title: {
    color: colors.gray[100],
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
})

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>
}

function Icon({ name }: { name: string }) {
  return <FontAwesome5 name={name} size={20} color={colors.gray[100]} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
