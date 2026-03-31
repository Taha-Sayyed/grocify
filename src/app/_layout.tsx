import { Stack } from "expo-router";
import "../../global.css"
import { ClerkProvider, ClerkLoaded, ClerkLoading } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import {ThemeProvider, DarkTheme, DefaultTheme} from "@react-navigation/native"
import {useColorScheme, View, ActivityIndicator} from 'react-native'
import { useEffect, type ReactNode } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { KeyboardProvider } from 'react-native-keyboard-controller'


SplashScreen.preventAutoHideAsync().catch(() => {})

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
console.log("app/_layout.tsx:::Clerk Publishable Key added successfully");

function ClerkNavigationShell({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme()
  useEffect(() => {
    console.log("ClerkLoaded: navigation tree mounted")
    SplashScreen.hideAsync().catch(() => {})
  }, [])
  return (
    <ThemeProvider value={colorScheme==="dark" ? DarkTheme:DefaultTheme}>
      {children}
    </ThemeProvider>
  )
}

export default function RootLayout() {
  console.log("Clerk Publishable Key Exist");
  
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <KeyboardProvider>
      <ClerkLoading>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </ClerkLoading>
      <ClerkLoaded>
        <ClerkNavigationShell>
          <Stack screenOptions={{headerShown:false}} />
        </ClerkNavigationShell>
      </ClerkLoaded>
    </KeyboardProvider>
    </ClerkProvider>
  )
}
