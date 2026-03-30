import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/expo'
import { ActivityIndicator, View } from 'react-native'

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  console.log("AuthGroup:", { isLoaded, isSignedIn })

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/list" />
  }

  return <Stack screenOptions={{headerShown:false}} />
}