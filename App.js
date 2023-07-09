import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated"
import Page from "./components/Page"

const words = ["what's", "going", "on", "peeps"]

export default function App() {
  const translateX = useSharedValue(0)
  const onScrollHandler = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x
  })

  return (
    <Animated.ScrollView onScroll={onScrollHandler} horizontal pagingEnabled>
      {words.map((word, i) => (
        <Page word={word} index={i} key={i} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
