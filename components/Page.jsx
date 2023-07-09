import { Dimensions, StyleSheet, Text, View } from "react-native"
import React from "react"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated"

const { width, height } = Dimensions.get("window")

const SIZE = width * 0.7

const Page = ({ word, index, translateX }) => {
  const input = [(index - 1) * width, index * width, (index + 1) * width]
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      input,
      [0, 1, 0],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ scale }],
    }
  }, [])
  const borderRadiusRStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateX.value,
      input,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    )
    return {
      borderRadius,
    }
  }, [])

  const textTranslateYRStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      input,
      [400, 0, -400],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ translateY }],
    }
  })
  const textOpacityRStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      input,
      [-2, 1, -2],
      Extrapolate.CLAMP
    )
    return {
      opacity,
    }
  })
  return (
    <View
      style={[
        styles.pageView,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.box, rStyle, borderRadiusRStyle]}>
        <Animated.Text
          style={[styles.textStyle, textTranslateYRStyle, textOpacityRStyle]}
        >
          {word}
        </Animated.Text>
      </Animated.View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  pageView: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgb(0,100,200)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  textStyle: {
    fontSize: SIZE * 0.25,
    textTransform: "capitalize",
    fontWeight: "600",
    color: "rgb(255,255,255)",
  },
})
