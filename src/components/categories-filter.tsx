import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import { CATEGORIES_ICONS } from "@/utils/constants"
import { MaterialIcons } from "@expo/vector-icons"
import {
  FlatList,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native"

const s = StyleSheet.create({
  container: {
    maxHeight: 37,
    position: "absolute",
    zIndex: 1,
    top: 64,
  },
  content: {
    gap: 8,
    paddingHorizontal: 24,
  },
  category: {
    height: 36,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 10,
  },
  categorySelected: {
    backgroundColor: colors.green.base,
  },
  categoryName: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
  categoryNameSelected: {
    color: colors.gray[100],
  },
})

interface CategoriesFilterProps {
  categories: {
    id: string
    icon: string
    name: string
  }[]
  selected?: string
  onSelected: (id: string) => void
}

interface CategoryProps extends PressableProps {
  name: string
  isSelected?: boolean
  iconId: string
}

function Category({
  name,
  isSelected = false,
  iconId,
  ...rest
}: CategoryProps) {
  return (
    <Pressable style={[s.category, isSelected && s.categorySelected]} {...rest}>
      <MaterialIcons
        name={CATEGORIES_ICONS[iconId] as any}
        size={16}
        color={colors.gray[isSelected ? 100 : 400]}
      />
      <Text style={[s.categoryName, isSelected && s.categoryNameSelected]}>
        {name}
      </Text>
    </Pressable>
  )
}

export function CategoriesFilter(args: CategoriesFilterProps) {
  return (
    <FlatList
      data={args.categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { name, id } }) => (
        <Category
          name={name}
          iconId={id}
          onPress={() => args.onSelected(id)}
          isSelected={id === args.selected}
        />
      )}
      horizontal
      contentContainerStyle={s.content}
      style={s.container}
      showsHorizontalScrollIndicator={false}
    />
  )
}
