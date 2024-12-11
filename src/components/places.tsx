import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import { FontAwesome5 } from "@expo/vector-icons"
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import { useRef } from "react"
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  useWindowDimensions,
} from "react-native"

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    gap: 12,
    padding: 24,
    paddingBottom: 100,
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: colors.gray[300],
  },
  title: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: fontFamily.regular,
    marginBottom: 16,
  },
  place: {
    height: 120,
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  placeImage: {
    width: 116,
    height: 104,
    backgroundColor: colors.gray[200],
    borderRadius: 8,
  },
  placeContent: {
    flex: 1,
    gap: 4,
  },
  placeName: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
  },
  placeDescription: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
  placeFooter: {
    flexDirection: "row",
    gap: 7,
    marginTop: 10,
  },
  placeTickets: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[400],
  },
})

export interface PlaceProps {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

interface PlacesProps {
  data: PlaceProps[]
}

function Place({
  data,
  ...rest
}: { data: PlaceProps } & TouchableOpacityProps) {
  return (
    <TouchableOpacity style={s.place} {...rest}>
      <Image style={s.placeImage} source={{ uri: data.cover }} />
      <View style={s.placeContent}>
        <Text style={s.placeName}>{data.name}</Text>
        <Text style={s.placeDescription} numberOfLines={2}>
          {data.description}
        </Text>
        <View style={s.placeFooter}>
          <FontAwesome5 name="ticket-alt" size={16} color={colors.red.base} />
          <Text style={s.placeTickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export function Places(args: PlacesProps) {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={args.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => (
          <Text style={s.title}>Explore locais perto de vocês</Text>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </BottomSheet>
  )
}
