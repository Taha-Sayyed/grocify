import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/expo'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth()
  console.log("Auth:", { route: "rootIndex", isLoaded, isSignedIn })

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return <Redirect href="/(tabs)/list" />
}