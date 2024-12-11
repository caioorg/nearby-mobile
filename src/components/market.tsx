import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import { FontAwesome5 } from "@expo/vector-icons"
import { router } from "expo-router"
import { ReactNode } from "react"
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import { Button } from "./button"

export function Market({ children }: { children: ReactNode }) {
  return <View style={{ flex: 1 }}>{children}</View>
}

const cover = StyleSheet.create({
  container: {
    width: "100%",
    height: 232,
    marginBottom: -32,
    backgroundColor: colors.gray[200],
  },
  header: {
    padding: 24,
    paddingTop: 56,
  },
})

function Cover({ uri }: { uri: string }) {
  return (
    <ImageBackground source={{ uri }} style={cover.container}>
      <View style={cover.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon name="arrow-left" />
        </Button>
      </View>
    </ImageBackground>
  )
}

const info = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: fontFamily.regular,
    lineHeight: 22.4,
    flex: 1,
  },
})

function Info({
  iconName,
  description,
}: {
  iconName: string
  description: string
}) {
  return (
    <View style={info.container}>
      <FontAwesome5
        style={{ width: 24 }}
        name={iconName}
        size={16}
        color={colors.gray[400]}
      />
      <Text style={info.text}>{description}</Text>
    </View>
  )
}

interface MarketDetail {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

const detail = StyleSheet.create({
  container: {
    padding: 32,
    paddingBottom: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: colors.gray[100],
  },
  name: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
  },
  description: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 22,
  },
  group: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingBottom: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginBottom: 12,
  },
  rule: {
    color: colors.gray[500],
    marginBottom: 8,
  },
})

function Details(args: { data: MarketDetail }) {
  return (
    <View style={detail.container}>
      <Text style={detail.name}>{args.data.name}</Text>
      <Text style={detail.description}>{args.data.description}</Text>
      <View style={detail.group}>
        <Text style={detail.title}>Informações</Text>
        <Info
          iconName="ticket-alt"
          description={`${args.data.coupons} cupons disponíveis`}
        />
        <Info iconName="map-marker-alt" description={args.data.address} />
        <Info iconName="phone-alt" description={args.data.phone} />
      </View>
      <View style={detail.group}>
        <Text style={detail.title}>Regulamento</Text>
        {args.data.rules.map((rule) => (
          <Text
            key={rule.id}
            style={detail.rule}
          >{`\u2022 ${rule.description}`}</Text>
        ))}
      </View>
    </View>
  )
}

const coupon = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },
  title: {
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
    marginBottom: 12,
    fontSize: 14,
  },
  content: {
    flexDirection: "row",
    backgroundColor: colors.green.soft,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    alignItems: "center",
  },
  code: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    textTransform: "uppercase",
  },
})

function Coupon({ code }: { code: string }) {
  return (
    <View style={coupon.container}>
      <Text style={coupon.title}>Utilize esse cupom</Text>
      <View style={coupon.content}>
        <FontAwesome5 name="ticket-alt" size={24} color={colors.green.light} />
        <Text style={coupon.code}>{code}</Text>
      </View>
    </View>
  )
}

Market.Cover = Cover
Market.Details = Details
Market.Coupon = Coupon
