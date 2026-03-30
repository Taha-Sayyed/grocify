import { Redirect, Stack } from 'expo-router'
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useAuth } from '@clerk/expo'
import {useColorScheme, ActivityIndicator, View} from "react-native"
import { useGroceryStore } from "@/store/grocery-store";
import { useEffect } from "react";

export default function Layout() {
  const { isSignedIn, isLoaded } = useAuth()
  const { loadItems, items } = useGroceryStore();
  const colorScheme=useColorScheme();
  const isDark=colorScheme==="dark";
  const tabintColor=isDark? "hsl(142 70% 54%)":"hsl(147 75% 33%)"

  console.log("TabsAuth:", { isLoaded, isSignedIn })

  useEffect(() => {
    loadItems();
  }, []);

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

  return(
    <NativeTabs tintColor={tabintColor}>
        <NativeTabs.Trigger name='list'>
            <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
                sf={{
                  default: "list.bullet.clipboard",
                  selected: "list.bullet.clipboard.fill",
                }}
                md="list"
            />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="planner">
            <NativeTabs.Trigger.Icon
              sf={{ default: "plus.circle", selected: "plus.circle.fill" }}
              // md="add"
              md="add_circle"
            />
            <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="insights">
            <NativeTabs.Trigger.Icon
              sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
              md="analytics"
            />
            <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
    </NativeTabs>
  )
}